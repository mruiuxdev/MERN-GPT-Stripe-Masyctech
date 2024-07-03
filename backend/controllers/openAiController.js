const expressAsyncHandler = require("express-async-handler");
const OpenAI = require("openai");
const User = require("../models/User");
const History = require("../models/History");

const openAiController = expressAsyncHandler(async (req, res) => {
  const { prompt } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    if (!prompt) {
      res.status(401);

      throw new Error("No prompt was provided");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 30,
    });

    const content = completion.choices[0].message.content.trim();

    if (!content) {
      res.status(401);

      throw new Error("Content generated failed");
    } else {
      const newContent = await History.create({
        user: req.user._id,
        content,
      });

      const userFound = await User.findById(req.user._id);
      userFound.history.push(newContent._id);
      await userFound.save();

      res.json({ status: "success", newContent });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { openAiController };
