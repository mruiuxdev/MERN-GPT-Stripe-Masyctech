const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
    const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id).select("-password");

    return next();
  } else {
    return res
      .status(401)
      .json({ status: "failed", message: "Not authorized" });
  }
});

module.exports = isAuthenticated;
