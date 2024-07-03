const { default: axios } = require("axios");
const expressAsyncHandler = require("express-async-handler");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

const openAiController = expressAsyncHandler(async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 30,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const newContent = await ContentHistory({ user: req.user.id, content });

    const userFound = await User.findById(req.user.id);
    userFound.history.push(newContent._id);

    const content = response?.data?.choices[0]?.text.trim();

    res.json({ status: "success", content });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { openAiController };
