// const Feature = require("../../models/Feature");

// const addFeatureImage = async (req, res) => {
//   try {
//     const { image } = req.body;

//     // Ensure image is in the correct format
//     if (!image || !image.imageUrl || !image.alt) {
//       return res.status(400).json({
//         success: false,
//         message: "Image data is incomplete. Please provide both 'imageUrl' and 'alt'.",
//       });
//     }

//     console.log(image, "image");

//     const featureImages = new Feature({
//       image,
//     });

//     await featureImages.save();

//     res.status(201).json({
//       success: true,
//       data: featureImages,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred!",
//     });
//   }
// };

// const getFeatureImages = async (req, res) => {
//   try {
//     const images = await Feature.find({});

//     res.status(200).json({
//       success: true,
//       data: images,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred!",
//     });
//   }
// };

// module.exports = { addFeatureImage, getFeatureImages };

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
