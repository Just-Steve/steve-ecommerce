const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected");

    if (!mongoose.connection.listeners('error').length) {
      mongoose.connection.once("error", (err) => {
        console.error("MongoDB connection error:", err);
      });
    }
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
