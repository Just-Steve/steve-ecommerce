require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./db");
const mongoose = require("mongoose");


const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const FRONTEND_URL = process.env.CLIENT_URL;


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === FRONTEND_URL) {
            callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 


app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);



app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ message: "Validation Error", details: err.errors });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  mongoose.connection.close().then(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
