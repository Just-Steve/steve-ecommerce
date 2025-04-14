import React, { useState, useEffect } from "react";

// Dummy promotions data for demonstration purposes
const dummyPromotions = [
  {
    id: 401,
    code: "SPRING20",
    discount: 20,
    description: "20% off on all spring collections.",
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    status: "Active",
  },
  {
    id: 402,
    code: "SUMMER15",
    discount: 15,
    description: "15% off on summer apparel.",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    status: "Upcoming",
  },
  {
    id: 403,
    code: "WINTER25",
    discount: 25,
    description: "25% off on all winter wear.",
    startDate: "2022-12-01",
    endDate: "2022-12-31",
    status: "Expired",
  },
  {
    id: 404,
    code: "FALL10",
    discount: 10,
    description: "10% off on fall collections.",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    status: "Upcoming",
  },
  {
    id: 405,
    code: "FLASH50",
    discount: 50,
    description: "50% off for 24 hours only!",
    startDate: "2023-04-15",
    endDate: "2023-04-15",
    status: "Active",
  },
  {
    id: 406,
    code: "VIP30",
    discount: 30,
    description: "Exclusive 30% off for VIP members.",
    startDate: "2023-02-01",
    endDate: "2023-02-28",
    status: "Expired",
  },
  // Additional dummy promotions can be added here
];

const AdminPromotionsManagementDashboard = () => {
  // State for promotions, search, filtering, sorting, pagination, and modal
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const promotionsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch promotions data
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setPromotions(dummyPromotions);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch promotions data.");
      setLoading(false);
    }
  };

  // Load promotions data on component mount
  useEffect(() => {
    fetchPromotions();
  }, []);

  // Handlers for search input and filter changes
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

  // Filter promotions based on search term (promotion code) and status
  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : promo.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort promotions by start date
  const sortedPromotions = filteredPromotions.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.startDate) - new Date(b.startDate);
    } else {
      return new Date(b.startDate) - new Date(a.startDate);
    }
  });

  // Pagination logic
  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = sortedPromotions.slice(indexOfFirstPromotion, indexOfLastPromotion);
  const totalPages = Math.ceil(sortedPromotions.length / promotionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing promotion details
  const openModal = (promo) => {
    setSelectedPromotion(promo);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPromotion(null);
    setShowModal(false);
  };

  // Render a table row for each promotion
  const renderTableRow = (promo) => (
    <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{promo.code}</td>
      <td className="p-4 text-gray-700">{promo.discount}%</td>
      <td className="p-4 text-gray-700">{promo.startDate}</td>
      <td className="p-4 text-gray-700">{promo.endDate}</td>
      <td className="p-4 text-gray-700">{promo.status}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(promo)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Promotions Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage and review your promotional campaigns. Use the filters below to search and sort promotions.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="promo-search" className="block text-lg text-gray-700 mb-2">
            Search by Promotion Code:
          </label>
          <input
            id="promo-search"
            type="text"
            placeholder="e.g., SPRING20"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="promo-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="promo-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <div>
          <label htmlFor="promo-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Start Date:
          </label>
          <select
            id="promo-sort"
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
          <p className="text-2xl text-gray-600">Loading promotions data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Promotions Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Promotion Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Discount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">End Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPromotions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600">
                      No promotions found.
                    </td>
                  </tr>
                ) : (
                  currentPromotions.map((promo) => renderTableRow(promo))
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

      {/* Promotion Details Modal */}
      {showModal && selectedPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Promotion Details (Code: {selectedPromotion.code})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Discount:</strong> {selectedPromotion.discount}%</p>
              <p className="text-gray-700"><strong>Description:</strong> {selectedPromotion.description}</p>
              <p className="text-gray-700"><strong>Start Date:</strong> {selectedPromotion.startDate}</p>
              <p className="text-gray-700"><strong>End Date:</strong> {selectedPromotion.endDate}</p>
              <p className="text-gray-700"><strong>Status:</strong> {selectedPromotion.status}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
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
          Admin Promotions Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes and Additional Insights */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          Analyze the effectiveness of promotions by tracking usage, customer engagement, and revenue impact. Detailed reports and real-time analytics can help optimize future campaigns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Usage Trends</h4>
            <p className="text-gray-600">
              View the popularity of each promotion over time. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Revenue Impact</h4>
            <p className="text-gray-600">
              Assess the overall effect of promotions on sales. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
    
      </section>
    </div>
  );
};

export default AdminPromotionsManagementDashboard;
