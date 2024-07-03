const { default: mongoose } = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
