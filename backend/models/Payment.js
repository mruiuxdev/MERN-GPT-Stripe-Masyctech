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
    monthRequestCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
