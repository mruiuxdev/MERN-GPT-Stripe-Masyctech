const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);

    throw new Error("User already exits");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = User({ username, email, password: hashedPassword });

  // Date the trial will end
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );

  await newUser.save();

  res.json({
    status: true,
    message: "Registration was successfully",
    user: { username: newUser.username, email: newUser.email },
  });
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);

    throw new Error("Invalid email or password");
  }

  const isMatchPassword = await bcrypt.compare(password, user?.password);
  if (!isMatchPassword) {
    res.status(401);

    throw new Error("Invalid email or password");
  }

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Token into cookie (http only)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.json({
    status: "success",
    message: "Login success",
    token,
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });

  res.json({ status: "success", message: "Logout successfully" });
});

const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json({ status: "success", user });
  } else {
    res.json(404);

    throw new Error("User not found");
  }
});

module.exports = {
  register,
  login,
  logout,
  userProfile,
};
