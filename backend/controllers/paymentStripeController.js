const expressAsyncHandler = require("express-async-handler");
const calculateNextBillingDate = require("../utils/calculateNextBillingDate");
const shouldRenewSubscriptionPlan = require("../utils/shouldRenewSubscriptionPlan");
const User = require("../models/User");
const Payment = require("../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleStripePayment = expressAsyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;

  const user = req.user;

  try {
    const paymentIntents = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      // * metadata object
      metadata: {
        userId: user.id.toString(),
        userEmail: user.email,
        subscriptionPlan,
      },
    });

    res.json({
      status: "succeeded",
      clientSecret: paymentIntents.client_secret,
      paymentId: paymentIntents.id,
      metadata: paymentIntents.metadata,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const verifyPayment = expressAsyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  try {
    const paymentIntents = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntents.status !== "succeeded") {
      const metadata = paymentIntents.metadata;
      const userId = metadata.userId;
      const subscriptionPlan = metadata.subscriptionPlan;
      const userEmail = metadata.userEmail;

      const userFound = await User.findById(userId);
      if (!userFound) {
        res.status(404).json({ status: "failed", message: "User not found" });
      }

      const amount = paymentIntents.amount / 100;
      const currency = paymentIntents.currency;
      const paymentId = paymentIntents.id;

      const newPayment = await Payment.create({
        user: userId,
        email: userEmail,
        subscriptionPlan,
        amount,
        currency,
        status: "success",
        reference: paymentId,
      });

      if (subscriptionPlan === "Basic") {
        const updatedUser = await User.findByIdAndUpdate(userId, {
          subscriptionPlan: "Basic",
          trialPeriod: 0,
          nextBillingDate: calculateNextBillingDate(),
          apiRequestCount: 0,
          monthlyRequestCount: 50,
          $addToSet: { payment: newPayment._id },
        });

        res.json({
          status: "succeeded",
          message: "Payment verified",
          updatedUser,
        });
      }

      if (subscriptionPlan === "Premium") {
        const updatedUser = await User.findByIdAndUpdate(userId, {
          subscriptionPlan: "Premium",
          trialPeriod: 0,
          nextBillingDate: calculateNextBillingDate(),
          apiRequestCount: 0,
          monthlyRequestCount: 100,
          $addToSet: { payment: newPayment._id },
        });

        res.json({
          status: "succeeded",
          message: "Payment verified",
          updatedUser,
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const handleFreeSubscription = expressAsyncHandler(async (req, res) => {
  const user = req.user;

  try {
    if (shouldRenewSubscriptionPlan(user)) {
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate();

      const newPayment = await Payment.create({
        user: user.id,
        subscriptionPlan: user.subscriptionPlan,
        monthlyRequestCount: user.monthlyRequestCount,
        apiRequestCount: user.apiRequestCount,
        currency: "usd",
        status: "succeeded",
        reference: Math.random().toString(36).substring(7),
      });

      user.payment.push(newPayment._id);

      await user.save();

      res.json({
        status: "succeeded",
        message: "Subscription plan updated successfully",
        user,
      });
    } else {
      return res.status(403).json({
        status: "failed",
        message: "Subscription renewal not due yet",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { handleStripePayment, verifyPayment, handleFreeSubscription };
