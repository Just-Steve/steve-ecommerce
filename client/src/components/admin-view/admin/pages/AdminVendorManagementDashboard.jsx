import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Added Firebase import (adjust the path as needed)


// Dummy vendor data for demonstration purposes
const dummyVendors = [
  {
    id: 1,
    name: "Fashion Hub Co.",
    email: "contact@fashionhub.com",
    phone: "0767 111-2222",
    status: "Active",
    registered: "2022-10-15",
    productsSupplied: 120,
  },
  {
    id: 2,
    name: "Trendsetters Inc.",
    email: "info@trendsetters.com",
    phone: "078333-4444",
    status: "Inactive",
    registered: "2022-08-22",
    productsSupplied: 85,
  },
  {
    id: 3,
    name: "Chic Apparel",
    email: "sales@chicapparel.com",
    phone: "0767 555-6666",
    status: "Active",
    registered: "2023-01-05",
    productsSupplied: 150,
  },
  {
    id: 4,
    name: "Urban Style",
    email: "support@urbanstyle.com",
    phone: "0767 777-8888",
    status: "Active",
    registered: "2022-12-10",
    productsSupplied: 95,
  },
  {
    id: 5,
    name: "Elegant Attire",
    email: "contact@elegantattire.com",
    phone: "0767 999-0000",
    status: "Inactive",
    registered: "2022-09-18",
    productsSupplied: 110,
  },
  {
    id: 6,
    name: "Footwear World",
    email: "info@footwearworld.com",
    phone: "0767 222-3333",
    status: "Active",
    registered: "2023-02-14",
    productsSupplied: 75,
  },
  // Additional dummy vendors can be added here
];

const AdminVendorManagementDashboard = () => {
  // State for vendor data and filtering, sorting, and pagination
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch vendor data
  const fetchVendors = async () => {
    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVendors(dummyVendors);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch vendor data.");
      setLoading(false);
    }
  };

  // Load vendor data when component mounts
  useEffect(() => {
    fetchVendors();
  }, []);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handler for filtering by vendor status
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  // Handler for sorting by registration date
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter vendors based on search term (vendor name) and status
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : vendor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort vendors by registration date
  const sortedVendors = filteredVendors.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.registered) - new Date(b.registered);
    } else {
      return new Date(b.registered) - new Date(a.registered);
    }
  });

  // Pagination logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = sortedVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(sortedVendors.length / vendorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing vendor details
  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVendor(null);
    setShowModal(false);
  };

  // Render a table row for each vendor record
  const renderTableRow = (vendor) => (
    <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{vendor.id}</td>
      <td className="p-4 text-gray-700">{vendor.name}</td>
      <td className="p-4 text-gray-700">{vendor.email}</td>
      <td className="p-4 text-gray-700">{vendor.phone}</td>
      <td className="p-4 text-gray-700">{vendor.registered}</td>
      <td className="p-4 text-gray-700">{vendor.productsSupplied}</td>
      <td className="p-4 text-gray-700">{vendor.status}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(vendor)}
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
        <h1 className="text-4xl font-extrabold text-gray-900">Vendor Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your vendors and review supplier details. Use the filters below to search and sort vendor information.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="vendor-search" className="block text-lg text-gray-700 mb-2">
            Search by Vendor Name:
          </label>
          <input
            id="vendor-search"
            type="text"
            placeholder="e.g., Fashion Hub Co."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="vendor-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="vendor-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label htmlFor="vendor-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Registration Date:
          </label>
          <select
            id="vendor-sort"
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
          <p className="text-2xl text-gray-600">Loading vendor data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Vendors Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Registered</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Products Supplied</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentVendors.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-gray-600">
                      No vendor records found.
                    </td>
                  </tr>
                ) : (
                  currentVendors.map((vendor) => renderTableRow(vendor))
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

      {/* Vendor Details Modal */}
      {showModal && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Vendor Details (ID: {selectedVendor.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Name:</strong> {selectedVendor.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {selectedVendor.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {selectedVendor.phone}</p>
              <p className="text-gray-700"><strong>Registered:</strong> {selectedVendor.registered}</p>
              <p className="text-gray-700"><strong>Products Supplied:</strong> {selectedVendor.productsSupplied}</p>
              <p className="text-gray-700"><strong>Status:</strong> {selectedVendor.status}</p>
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
          Admin Vendor Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes and Additional Insights */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          Analyze vendor performance and trends to optimize supplier relationships. Detailed metrics and vendor insights help in making data-driven decisions for inventory management and product sourcing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Performance Metrics</h4>
            <p className="text-gray-600">
              Evaluate average delivery times, order fulfillment rates, and quality metrics. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Supplier Trends</h4>
            <p className="text-gray-600">
              Track changes in product supply volumes and identify top-performing vendors. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminVendorManagementDashboard;
