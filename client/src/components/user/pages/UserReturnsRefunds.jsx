import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy data simulating user's orders eligible for returns/refunds
const dummyOrders = [
  {
    id: "ORD1001",
    date: "2025-03-20",
    total: 159.97,
    status: "Delivered",
    items: [
      { name: "Elegant Red Dress", quantity: 1, price: 79.99 },
      { name: "Casual Blue Top", quantity: 2, price: 39.99 },
    ],
  },
  {
    id: "ORD1003",
    date: "2025-03-15",
    total: 144.97,
    status: "Delivered",
    items: [
      { name: "Stylish Black Skirt", quantity: 2, price: 49.99 },
      { name: "Comfortable White Blouse", quantity: 1, price: 44.99 },
    ],
  },
  {
    id: "ORD1004",
    date: "2025-03-10",
    total: 99.99,
    status: "Delivered",
    items: [
      { name: "Elegant Black Heels", quantity: 1, price: 99.99 },
    ],
  },
  // Additional orders can be added here...
];

const UserReturnsRefunds = () => {
  const navigate = useNavigate();

  // States for order selection and return/refund details
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  // States for feedback messages and loading state
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user's orders eligible for returns/refunds (simulate API call)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Filter only delivered orders eligible for return/refund
      setOrders(dummyOrders.filter(order => order.status === "Delivered"));
      setLoading(false);
    } catch (err) {
      setErrorMessage("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handler for file input changes (for uploading supporting images)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Validate and handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Basic validations
    if (!selectedOrderId) {
      setErrorMessage("Please select an order for return/refund.");
      return;
    }
    if (!reason) {
      setErrorMessage("Please provide a reason for the return/refund.");
      return;
    }

    setLoading(true);

    // Simulate API call for submitting return/refund request
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      setSuccessMessage("Your return/refund request has been submitted successfully.");
      // Optionally, clear form fields
      setSelectedOrderId("");
      setReason("");
      setAdditionalDetails("");
      setUploadFile(null);
      setPreviewUrl("");
      // After a delay, navigate to the order history or support page
      setTimeout(() => {
        navigate("/orders");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Returns & Refunds
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Initiate a return or refund request for your order.
        </p>
      </header>

      {/* Display loading state or error if present */}
      {loading && (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Processing your request...</p>
        </div>
      )}
      {errorMessage && (
        <div className="py-4 mb-6 text-center bg-red-100 text-red-700 border border-red-300 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Return/Refund Form */}
      {!formSubmitted && !loading && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Return/Refund Request</h2>

          {/* Order Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Order <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select an Order --</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.id} - {new Date(order.date).toLocaleDateString()} - ${order.total.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Reason for Return/Refund */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Reason for Return/Refund <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a detailed reason..."
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>

          {/* Additional Details */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Provide any additional information..."
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            ></textarea>
          </div>

          {/* Upload Supporting Image */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Upload Supporting Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewUrl && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={previewUrl}
                  alt="Upload Preview"
                  className="w-64 h-64 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Submitting Request..." : "Submit Request"}
            </button>
          </div>
        </form>
      )}

      {/* Success Message */}
      {formSubmitted && (
        <div className="py-12 text-center bg-green-100 border border-green-300 rounded-lg">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Request Submitted!</h2>
          <p className="text-xl text-green-600">
            Your return/refund request has been successfully submitted.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            You will be redirected to your orders page shortly.
          </p>
        </div>
      )}

   

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Returns & Refunds &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserReturnsRefunds;
