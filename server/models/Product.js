const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);


// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   title: { type: String },
//   description: { type: String },
//   category: { type: String },
//   brand: { type: String },
//   price: { type: Number },
//   salePrice: { type: Number },
//   totalStock: { type: Number },
//   averageReview: { type: Number },
//   images: [String], 
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Product', productSchema);
