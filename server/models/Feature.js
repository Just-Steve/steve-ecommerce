const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema(
  {
    image: { 
      imageUrl: { type: String, required: true },
      alt: { type: String, required: true } 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", FeatureSchema);
