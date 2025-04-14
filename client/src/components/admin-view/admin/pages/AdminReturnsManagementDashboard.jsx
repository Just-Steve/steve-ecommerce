import React, { useState, useEffect } from "react";

// Dummy data simulating product returns
const dummyReturns = [
  {
    id: 201,
    orderId: "ORD-1001",
    customer: "Alice Johnson",
    product: "Elegant Red Dress",
    reason: "Size too small",
    status: "Pending",
    returnDate: "2023-03-16",
  },
  {
    id: 202,
    orderId: "ORD-1002",
    customer: "Bob Smith",
    product: "Casual Blue Top",
    reason: "Color mismatch",
    status: "Approved",
    returnDate: "2023-03-15",
  },
  {
    id: 203,
    orderId: "ORD-1003",
    customer: "Carol Davis",
    product: "Stylish Black Skirt",
    reason: "Defective item",
    status: "Rejected",
    returnDate: "2023-03-14",
  },
  {
    id: 204,
    orderId: "ORD-1004",
    customer: "David Lee",
    product: "Comfortable White Blouse",
    reason: "Changed mind",
    status: "Pending",
    returnDate: "2023-03-13",
  },
  {
    id: 205,
    orderId: "ORD-1005",
    customer: "Eva Green",
    product: "Flowy Floral Dress",
    reason: "Wrong size delivered",
    status: "Approved",
    returnDate: "2023-03-12",
  },
  {
    id: 206,
    orderId: "ORD-1006",
    customer: "Frank Miller",
    product: "Elegant Black Heels",
    reason: "Defective sole",
    status: "Pending",
    returnDate: "2023-03-11",
  },
  // Additional dummy returns can be added here
];

const AdminReturnsManagementDashboard = () => {
  // States for return data and filtering
  const [returns, setReturns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const returnsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Simulate API call to fetch returns data
  const fetchReturns = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
      setReturns(dummyReturns);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch returns data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  // Handlers for search and filter
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

  // Filter returns based on search term (order ID or product) and status
  const filteredReturns = returns.filter((ret) => {
    const matchesSearch =
      ret.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : ret.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort returns by return date
  const sortedReturns = filteredReturns.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.returnDate) - new Date(b.returnDate);
    } else {
      return new Date(b.returnDate) - new Date(a.returnDate);
    }
  });

  // Pagination logic
  const indexOfLastReturn = currentPage * returnsPerPage;
  const indexOfFirstReturn = indexOfLastReturn - returnsPerPage;
  const currentReturns = sortedReturns.slice(indexOfFirstReturn, indexOfLastReturn);
  const totalPages = Math.ceil(sortedReturns.length / returnsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing return details
  const openReturnModal = (ret) => {
    setSelectedReturn(ret);
    setShowReturnModal(true);
  };

  const closeReturnModal = () => {
    setSelectedReturn(null);
    setShowReturnModal(false);
  };

  // Render each return table row
  const renderReturnRow = (ret) => (
    <tr key={ret.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{ret.orderId}</td>
      <td className="p-4 text-gray-700">{ret.customer}</td>
      <td className="p-4 text-gray-700">{ret.product}</td>
      <td className="p-4 text-gray-700">{ret.reason}</td>
      <td className="p-4 text-gray-700">{ret.status}</td>
      <td className="p-4 text-gray-700">{ret.returnDate}</td>
      <td className="p-4">
        <button
          onClick={() => openReturnModal(ret)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Returns Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Review and manage product returns from customers. Use the filters below to refine your view.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="return-search" className="block text-lg text-gray-700 mb-2">
            Search (Order ID or Product):
          </label>
          <input
            id="return-search"
            type="text"
            placeholder="e.g., ORD-1001 or Red Dress"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="return-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="return-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="return-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Date:
          </label>
          <select
            id="return-sort"
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
          <p className="text-2xl text-gray-600">Loading returns data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Returns Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reason</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Return Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentReturns.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-600">
                      No return records found.
                    </td>
                  </tr>
                ) : (
                  currentReturns.map((ret) => renderReturnRow(ret))
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
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Return Details Modal */}
      {showReturnModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Return Details (Order: {selectedReturn.orderId})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Customer:</strong> {selectedReturn.customer}</p>
              <p className="text-gray-700"><strong>Product:</strong> {selectedReturn.product}</p>
              <p className="text-gray-700"><strong>Reason:</strong> {selectedReturn.reason}</p>
              <p className="text-gray-700"><strong>Status:</strong> {selectedReturn.status}</p>
              <p className="text-gray-700"><strong>Return Date:</strong> {selectedReturn.returnDate}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeReturnModal}
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
          Admin Returns Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes and Additional Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          This section provides extra insights into return trends, common issues, and recommendations for improving customer satisfaction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Return Trend Analysis</h4>
            <p className="text-gray-600">
              Analyze the frequency and reasons for returns. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec tincidunt ullamcorper, massa felis faucibus sapien, et varius sapien urna ac orci.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Recommendations</h4>
            <p className="text-gray-600">
              Suggestions to reduce return rates and improve customer experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin at velit vel lacus pretium sollicitudin.
            </p>
          </div>
        </div>
       
      </section>
    </div>
  );
};

export default AdminReturnsManagementDashboard;
