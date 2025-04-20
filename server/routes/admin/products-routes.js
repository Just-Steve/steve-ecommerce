const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;



// const express = require("express");
// const {
//   handleImageUpload,
//   handleMultipleImageUpload,
//   addProduct,
//   editProduct,
//   fetchAllProducts,
//   deleteProduct,
// } = require("../../controllers/admin/products-controller");
// const { upload } = require("../../helpers/cloudinary");

// const router = express.Router();

// // Single image upload
// router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// // Multiple images upload; adjust max count as needed (here 5)
// router.post("/upload-images", upload.array("my_files", 5), handleMultipleImageUpload);

// // Product endpoints
// router.post("/add", addProduct);
// router.put("/edit/:id", editProduct);
// router.delete("/delete/:id", deleteProduct);
// router.get("/get", fetchAllProducts);

// module.exports = router;