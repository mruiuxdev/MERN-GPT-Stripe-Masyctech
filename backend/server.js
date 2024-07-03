const express = require("express");
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");

require("dotenv").config();
require("./utils/database")();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
