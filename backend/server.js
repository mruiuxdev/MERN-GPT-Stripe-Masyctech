const dotenv = require("dotenv");
dotenv.config({ path: "./.env.local" });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require("node-cron"); // ? for trial period
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorHandler");
const openAiRouter = require("./routes/openAiRouter");
const stripePaymentRouter = require("./routes/stripePaymentRouter");
const User = require("./models/User");

require("./utils/database")();

const PORT = process.env.PORT || 8080;

const app = express();

// * cron the trial period => run every single day
cron.schedule("0 0 * * * *", async () => {
  try {
    const today = new Date();

    await User.updateMany(
      {
        trialActive: true,
        trialExpires: { $lt: today },
      },
      {
        trialActive: false,
        subscriptionPlan: "Free",
        monthlyRequestCount: 5,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// * cron the free plan => run at the end of every month
cron.schedule("0 0 1 * * *", async () => {
  try {
    const today = new Date();

    await User.updateMany(
      {
        subscriptionPlan: "Free",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// * cron the basic plan => run at the end of every month
cron.schedule("0 0 1 * * *", async () => {
  try {
    const today = new Date();

    await User.updateMany(
      {
        subscriptionPlan: "Basic",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// * cron the premium plan => run at the end of every month
cron.schedule("0 0 1 * * *", async () => {
  try {
    const today = new Date();

    await User.updateMany(
      {
        subscriptionPlan: "Premium",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.LOCALHOST_FRONT_END,
    credentials: true,
  })
);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAiRouter);
app.use("/api/v1/stripe", stripePaymentRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
