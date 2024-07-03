const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const openAiRouter = require("./routes/openAiRouter");

dotenv.config({ path: "./.env.local" });

require("./utils/database")();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAiRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
