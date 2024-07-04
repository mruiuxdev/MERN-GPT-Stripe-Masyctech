const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: Number,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
