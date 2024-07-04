const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { openAiGenerate } = require("../controllers/openAiController");
const checkApiRequestLimit = require("../middlewares/checkApiLimitRequest");

const openAiRouter = express.Router();

openAiRouter.post(
  "/generate-content",
  isAuthenticated,
  checkApiRequestLimit,
  openAiGenerate
);

module.exports = openAiRouter;
