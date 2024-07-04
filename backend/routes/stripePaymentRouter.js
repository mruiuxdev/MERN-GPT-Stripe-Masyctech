const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  handleStripePayment,
  handleFreeSubscription,
  verifyPayment,
} = require("../controllers/paymentStripeController");

const stripePaymentRouter = express.Router();

stripePaymentRouter.post("/checkout", isAuthenticated, handleStripePayment);
stripePaymentRouter.post(
  "/verify-payment/:paymentId",
  isAuthenticated,
  verifyPayment
);
stripePaymentRouter.post("/free-plan", isAuthenticated, handleFreeSubscription);

module.exports = stripePaymentRouter;
