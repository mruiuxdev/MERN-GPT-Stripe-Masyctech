const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() =>
        console.log(`Database is connected ${mongoose.connection.host}`)
      );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectDB;
