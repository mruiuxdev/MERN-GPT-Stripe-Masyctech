const bcrypt = require("bcryptjs");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

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

module.exports = {
  register,
};
