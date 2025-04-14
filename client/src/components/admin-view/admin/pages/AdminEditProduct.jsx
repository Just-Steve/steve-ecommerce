import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// Dummy product data to simulate an API response for editing
const dummyProductData = {
  id: 1,
  name: "Elegant Red Dress",
  category: "Dresses",
  price: 79.99,
  stock: 10,
  description: "A beautiful red dress perfect for formal events.",
  imageUrl: "https://shopzetu.com/cdn/shop/files/ETU7381_360x.jpg?v=1716456346",
};

const AdminEditProduct = () => {
  const { productId } = useParams(); // Get product id from URL
  const navigate = useNavigate();

  // States for form fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // States for API simulation, loading, errors, and success messages
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dummy API call simulation to fetch product details
  const fetchProductDetails = async (id) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real scenario, you would fetch data based on product id:
      // const response = await fetch(`/api/products/${id}`);
      // const data = await response.json();
      const data = dummyProductData; // Use dummy data
      // Pre-fill form fields with fetched data
      setProductName(data.name);
      setCategory(data.category);
      setPrice(data.price);
      setStock(data.stock);
      setDescription(data.description);
      setImageUrl(data.imageUrl);
      setLoading(false);
    } catch (err) {
      setError("Failed to load product details.");
      setLoading(false);
    }
  };

  // Load product details on component mount
  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  // Handler for file input changes for updating image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  // Dummy API call simulation for updating product details
  const updateProductAPI = async (updatedProduct) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly simulate success/failure for demonstration purposes
        if (Math.random() > 0.1) {
          resolve({ message: "Product updated successfully!", data: updatedProduct });
        } else {
          reject(new Error("Update failed. Please try again."));
        }
      }, 1200);
    });
  };

  // Form submission handler for updating product details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitLoading(true);

    // Validate all required fields
    if (!productName || !price || !stock || !description || !imageUrl) {
      setError("All fields marked with * are required.");
      setSubmitLoading(false);
      return;
    }

    // Construct updated product object
    const updatedProduct = {
      id: productId,
      name: productName,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      imageUrl,
    };

    try {
      const response = await updateProductAPI(updatedProduct);
      setSuccess(response.message);
      setSubmitLoading(false);

      // Optionally, reset image file state
      setImageFile(null);

      // After a short delay, navigate back to the Manage Items page
      setTimeout(() => {
        navigate("/dashboard/manage-products");
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-3">
          <Link to="/dashboard/manage-products" className="text-blue-600 hover:underline">
            &larr; Back
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900">Edit Product</h1>
        </div>
        <p className="text-gray-600 mt-2">
          Update the product details below. Fields marked with <span className="text-red-500">*</span> are required.
        </p>
      </header>

      {/* Loading State */}
      {loading && (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading product details...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Edit Form */}
      {!loading && !error && (
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-lg font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Dresses">Dresses</option>
              <option value="Tops">Tops</option>
              <option value="Skirts">Skirts</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-lg font-medium text-gray-700 mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter available stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>

          {/* Image Upload and Preview */}
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageUrl && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Image Preview:</p>
                <img src={imageUrl} alt="Product Preview" className="w-64 h-64 object-cover rounded-lg border" />
              </div>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitLoading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                submitLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitLoading ? "Updating Product..." : "Update Product"}
            </button>
          </div>
        </form>
      )}

      {/* Additional Information Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editing Guidelines</h2>
        <p className="text-gray-600 mb-2">
          Please ensure that all fields are updated correctly. Use clear product descriptions, and double-check the pricing and stock information.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Ensure the product name is descriptive and unique.</li>
          <li>Use high-resolution images for better display quality.</li>
          <li>Review the updated price and stock to maintain accurate inventory.</li>
          <li>Provide a concise yet detailed description.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base mb-4 font-semibold tracking-wider">
          Admin Panel &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

     
    </div>
  );
};

export default AdminEditProduct;
