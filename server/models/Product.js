const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, default: 0, min: 0 },
    totalStock: { type: Number, required: true, min: 0 },
    averageReview: { type: Number, default: 0, min: 0, max: 5 },
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
