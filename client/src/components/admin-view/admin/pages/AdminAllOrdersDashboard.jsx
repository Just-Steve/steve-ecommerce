import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Random Order Generation Functions
const getRandomDate = () => {
  const daysAgo = Math.floor(Math.random() * 60); // Random date within the last 60 days
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const getRandomName = () => {
  const firstNames = [
    "Alice", "Bob", "Carol", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack",
    "Liam", "Mia", "Noah", "Olivia", "Paul", "Quinn", "Rachel", "Steve", "Tom", "Uma",
    "Victor", "Wendy", "Xander", "Yasmine", "Zack"
  ];
  const lastNames = [
    "Johnson", "Smith", "Davis", "Lee", "Green", "White", "Hall", "King", "Lopez", "Wilson",
    "Miller", "Taylor", "Anderson", "Martinez", "Thomas", "Harris", "Clark", "Lewis", "Robinson", "Walker"
  ];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

const getRandomItem = () => {
  const categories = ["Dress", "Top", "Skirt", "Blouse", "Heels", "Jacket", "Sweater", "Pants", "Bag", "Scarf", "Hat", "Jeans", "T-Shirt", "Sunglasses", "Coat", "Boots"];
  const styles = ["Elegant", "Casual", "Stylish", "Comfortable", "Trendy", "Luxury", "Modern", "Chic", "Boho", "Vintage", "Sporty", "Formal", "Classic"];
  const colors = ["Red", "Blue", "Black", "White", "Green", "Pink", "Yellow", "Beige", "Purple", "Gray", "Brown", "Orange", "Teal"];
  const name = `${styles[Math.floor(Math.random() * styles.length)]} ${colors[Math.floor(Math.random() * colors.length)]} ${categories[Math.floor(Math.random() * categories.length)]}`;
  const price = (Math.random() * (250 - 20) + 20).toFixed(2); // Prices between $20 and $250
  return { name, price: parseFloat(price) };
};

const statuses = ["Processing", "Shipped", "Delivered", "Cancelled", "Pending", "Returned"];

const generateRandomOrder = (id) => {
  const customer = getRandomName(); // Random customer
  const orderItems = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => {
    const item = getRandomItem();
    return { name: item.name, quantity: Math.floor(Math.random() * 3) + 1, price: item.price };
  });

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const date = getRandomDate();

  return { id, customer, items: orderItems, total: parseFloat(total), status, date };
};

// Generate 20 random orders
const dummyOrders = Array.from({ length: 20 }, (_, index) => generateRandomOrder(index + 101));

console.log(dummyOrders);

const AdminAllOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Simulate fetching orders from an API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOrders(dummyOrders);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle search and filter changes
  const handleSearchChange = (e) => {
    setSearchOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter and sort orders
  const filteredOrders = orders.filter((order) => {
    const matchesCustomer = order.customer.toLowerCase().includes(searchOrder.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : order.status === filterStatus;
    return matchesCustomer && matchesStatus;
  });

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

  // Order Modal Controls
  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setShowOrderModal(false);
  };

  // Render each order row
  const renderOrderRow = (order) => (
    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 font-medium text-gray-800">{order.id}</td>
      <td className="p-4 text-gray-700">{order.customer}</td>
      <td className="p-4 text-gray-600">${order.total.toFixed(2)}</td>
      <td className="p-4 text-gray-600">{order.status}</td>
      <td className="p-4 text-gray-600">{order.date}</td>
      <td className="p-4">
        <button
          onClick={() => openOrderModal(order)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View
        </button>
      </td>
    </tr>
  );

  // Create chart data for order status breakdown
  const orderCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(orderCounts).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">All Orders Dashboard</h1>
        <div>
          <button
            onClick={fetchOrders}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Refresh Orders
          </button>
        </div>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="order-search" className="block text-lg text-gray-700 mb-2">
            Search by Customer:
          </label>
          <input
            id="order-search"
            type="text"
            placeholder="Enter customer name..."
            value={searchOrder}
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
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
            <option value="Returned">Returned</option>
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
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => renderOrderRow(order))}
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
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
            <p className="text-gray-700 mb-2">
              <strong>Customer:</strong> {selectedOrder.customer}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Items Ordered:
              </h3>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <ul className="list-disc pl-6 text-gray-700">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity} x {item.name} (@ ${item.price.toFixed(2)} each)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No items found.</p>
              )}
            </div>
            <p className="text-gray-800 text-xl font-bold mb-6">
              Total: ${selectedOrder.total.toFixed(2)}
            </p>
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

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          All Orders Dashboard &copy; {new Date().getFullYear()} - Admin Panel.
        </p>
      </footer>

      {/* Extra Verbose Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Additional Metrics
        </h3>
        <p className="text-gray-600 mb-3">
          This section provides extra insights, such as order volume trends, average order values, and more detailed reports.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Monthly Order Volume
            </h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec lacus magna. Proin sit amet arcu vel leo accumsan fermentum.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              Average Order Value
            </h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed mollis, eros vel faucibus congue, dui ligula laoreet sapien, ac laoreet ipsum sapien sed nunc.
            </p>
          </div>
        </div>
       
      </section>

      {/* Motion-Effect Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Order Status Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAllOrdersDashboard;
