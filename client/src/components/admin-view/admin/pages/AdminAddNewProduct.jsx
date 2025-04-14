import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddNewProduct = () => {
  // State for form fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // States for handling API calls, errors, and success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Dummy API call simulation for adding a product
  const addProductAPI = async (productData) => {
    // Simulate API delay and response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly simulate success/failure for demonstration
        if (Math.random() > 0.2) {
          resolve({ message: "Product added successfully!", data: productData });
        } else {
          reject(new Error("Failed to add product. Please try again."));
        }
      }, 1200);
    });
  };

  // Handler for file input changes to simulate image upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for image preview
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate required fields
    if (!productName || !price || !stock || !description || !imageUrl) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Construct product data object
    const newProduct = {
      name: productName,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      imageUrl,
    };

    try {
      // Call the dummy API function to simulate adding the product
      const response = await addProductAPI(newProduct);
      setSuccess(response.message);
      setLoading(false);
      // Optionally, reset form fields
      setProductName("");
      setCategory("Dresses");
      setPrice("");
      setStock("");
      setDescription("");
      setImageUrl("");
      setImageFile(null);

      // After a short delay, navigate back to the products list
      setTimeout(() => {
        navigate("/dashboard/manage-products");
      }, 2000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">
          Use the form below to add a new product to your catalog.
        </p>
      </header>

      {/* Form Section */}
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
            disabled={loading}
            className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>

      {/* Additional Information Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h2>
        <p className="text-gray-600 mb-2">
          Here you can include tips on image quality, SEO optimization for product titles, and guidelines on inventory tracking. This section is intended to provide administrators with helpful insights for adding high-quality products.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Ensure the product name is descriptive and unique.</li>
          <li>Use high-resolution images for better customer experience.</li>
          <li>Double-check the price and stock before submission.</li>
          <li>Write a clear and concise product description.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          Admin Panel &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

    
    </div>
  );
};

export default AdminAddNewProduct;
