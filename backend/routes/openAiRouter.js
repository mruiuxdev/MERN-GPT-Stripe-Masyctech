const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { openAiController } = require("../controllers/openAiController");

const openAiRouter = express.Router();

openAiRouter.post("/generate-content", isAuthenticated, openAiController);

module.exports = openAiRouter;
