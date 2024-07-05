const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

const checkApiRequestLimit = expressAsyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "failed", message: "Not authorized" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }

  let requestLimit = 0;

  if (user.trialActive) {
    requestLimit = user.monthlyRequestCount;
  }

  if (user.apiRequestCount >= requestLimit) {
    throw new Error("API request limit reached, please subscribe to a plain");
  }

  next();
});

module.exports = checkApiRequestLimit;
