const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary using environment variables for security
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dr4xqqh81",
  api_key: process.env.CLOUDINARY_API_KEY || "619377481978147",
  api_secret: process.env.CLOUDINARY_API_SECRET || "KofgYl_W0E07x9OTaUA0SL_21qw",
});

// Setup multer to store files in memory
const storage = new multer.memoryStorage();

// Utility function to upload images to Cloudinary
async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

// Initialize multer with the defined storage
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
