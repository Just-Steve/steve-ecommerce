import React, { useState, useEffect } from "react";

// ----- Utility Functions to Generate Random Orders -----

// Randomly picks an element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Returns a date string (YYYY-MM-DD) for a random day in March 2025
function getRandomDateInMarch2025() {
  // Random day from 1 to 31
  const day = Math.floor(Math.random() * 31) + 1;
  return `2025-03-${String(day).padStart(2, "0")}`;
}

// List of possible item names
const itemNames = [
  "Elegant Red Dress",
  "Casual Blue Top",
  "Flowy Floral Dress",
  "Stylish Black Skirt",
  "Comfortable White Blouse",
  "Elegant Black Heels",
  "Classic Denim Jeans",
  "Cozy Cardigan Sweater",
];

// Possible order statuses
const statuses = ["Completed", "Processing", "Pending", "Cancelled"];

// Generate a random item (name, quantity, price)
function generateRandomItem() {
  const name = getRandomElement(itemNames);
  const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3
  // Price between 30 and 100, with 2 decimals
  const price = parseFloat((Math.random() * (100 - 30) + 30).toFixed(2));
  return { name, quantity, price };
}

// Generate a random order
function generateRandomOrder() {
  // Create between 1 and 4 items for each order
  const itemCount = Math.floor(Math.random() * 4) + 1;
  const items = Array.from({ length: itemCount }, generateRandomItem);

  // Calculate total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Random 4-digit number for order ID (e.g. 1000-9999)
  const randomDigits = Math.floor(Math.random() * 9000) + 1000;

  return {
    id: `ORD${randomDigits}`,
    date: getRandomDateInMarch2025(),
    items,
    total: parseFloat(total.toFixed(2)),
    status: getRandomElement(statuses),
  };
}

// Generate 'count' random orders
function generateRandomOrders(count = 50) {
  return Array.from({ length: count }, () => generateRandomOrder());
}

// ----- Main Component -----

const UserOrders = () => {
  // States for orders, search/filter/sort, pagination, and modal
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Simulate an API call to fetch user orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Generate 50 random orders
      const randomOrders = generateRandomOrders(50);
      setOrders(randomOrders);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handlers for search, filter, and sort
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter orders based on search (by ID) and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort orders by date
  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls
  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setShowOrderModal(false);
  };

  // Render a table row for each order
  const renderOrderRow = (order) => (
    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{order.id}</td>
      <td className="p-4 text-gray-700">{order.date}</td>
      <td className="p-4 text-gray-700">${order.total.toFixed(2)}</td>
      {/* Status styling based on the order's status */}
      <td
        className={`p-4 font-semibold ${
          order.status === "Completed"
            ? "text-green-600"
            : order.status === "Processing"
            ? "text-yellow-600"
            : order.status === "Pending"
            ? "text-red-600"
            : "text-gray-600" // Cancelled or any other status
        }`}
      >
        {order.status}
      </td>
      <td className="p-4">
        <button
          onClick={() => openOrderModal(order)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">
          Here you can view all of your orders, track their status, and review details.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="order-search" className="block text-lg text-gray-700 mb-2">
            Search by Order ID:
          </label>
          <input
            id="order-search"
            type="text"
            placeholder="e.g., ORD1001"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="order-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="order-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label htmlFor="order-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Date:
          </label>
          <select
            id="order-sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchOrders}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Refresh
          </button>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Orders Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-600">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order) => renderOrderRow(order))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Order Details (ID: {selectedOrder.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Status:</strong> {selectedOrder.status}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Items</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.quantity} x {item.name} (@ ${item.price.toFixed(2)} each)
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeOrderModal}
                className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Orders Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserOrders;
