const Feature = require("../../models/Feature");

// Add a feature image
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image field is required",
      });
    }

    console.log("Received image:", image);

    const featureImages = new Feature({ image });
    await featureImages.save();

    return res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get all feature images
const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});
    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages };
