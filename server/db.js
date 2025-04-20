const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");

    mongoose.connection.once("open", () => {
      console.log("MongoDB connection established");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB connection lost");
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
