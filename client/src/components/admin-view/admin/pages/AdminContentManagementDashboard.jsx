import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy content data for banners, blog posts, and site pages
const dummyContent = [
  {
    id: 701,
    title: "Spring Collection Banner",
    type: "Banner",
    status: "Active",
    updated: "2023-03-10",
  },
  {
    id: 702,
    title: "About Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-02-28",
  },
  {
    id: 703,
    title: "Latest Blog Post: Trends in Fashion",
    type: "Blog Post",
    status: "Draft",
    updated: "2023-03-12",
  },
  {
    id: 704,
    title: "Summer Sale Banner",
    type: "Banner",
    status: "Inactive",
    updated: "2023-01-15",
  },
  {
    id: 705,
    title: "Contact Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-03-05",
  },
  {
    id: 701,
    title: "Spring Collection Banner",
    type: "Banner",
    status: "Active",
    updated: "2023-03-10",
  },
  {
    id: 702,
    title: "About Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-02-28",
  },
  {
    id: 703,
    title: "Latest Blog Post: Trends in Fashion",
    type: "Blog Post",
    status: "Draft",
    updated: "2023-03-12",
  },
  {
    id: 704,
    title: "Summer Sale Banner",
    type: "Banner",
    status: "Inactive",
    updated: "2023-01-15",
  },
  {
    id: 705,
    title: "Contact Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-03-05",
  },
  {
    id: 701,
    title: "Spring Collection Banner",
    type: "Banner",
    status: "Active",
    updated: "2023-03-10",
  },
  {
    id: 702,
    title: "About Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-02-28",
  },
  {
    id: 703,
    title: "Latest Blog Post: Trends in Fashion",
    type: "Blog Post",
    status: "Draft",
    updated: "2023-03-12",
  },
  {
    id: 704,
    title: "Summer Sale Banner",
    type: "Banner",
    status: "Inactive",
    updated: "2023-01-15",
  },
  {
    id: 705,
    title: "Contact Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-03-05",
  },
  {
    id: 701,
    title: "Spring Collection Banner",
    type: "Banner",
    status: "Active",
    updated: "2023-03-10",
  },
  {
    id: 702,
    title: "About Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-02-28",
  },
  {
    id: 703,
    title: "Latest Blog Post: Trends in Fashion",
    type: "Blog Post",
    status: "Draft",
    updated: "2023-03-12",
  },
  {
    id: 704,
    title: "Summer Sale Banner",
    type: "Banner",
    status: "Inactive",
    updated: "2023-01-15",
  },
  {
    id: 705,
    title: "Contact Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-03-05",
  },
  {
    id: 701,
    title: "Spring Collection Banner",
    type: "Banner",
    status: "Active",
    updated: "2023-03-10",
  },
  {
    id: 702,
    title: "About Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-02-28",
  },
  {
    id: 703,
    title: "Latest Blog Post: Trends in Fashion",
    type: "Blog Post",
    status: "Draft",
    updated: "2023-03-12",
  },
  {
    id: 704,
    title: "Summer Sale Banner",
    type: "Banner",
    status: "Inactive",
    updated: "2023-01-15",
  },
  {
    id: 705,
    title: "Contact Us Page",
    type: "Page",
    status: "Active",
    updated: "2023-03-05",
  },
  // Additional dummy content can be added here
];

const AdminContentManagementDashboard = () => {
  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch content data
  const fetchContent = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setContent(dummyContent);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch content data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  // Filter content based on search term and type
  const filteredContent = content.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" ? true : item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * contentPerPage;
  const indexOfFirstItem = indexOfLastItem - contentPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / contentPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing content details
  const openModal = (item) => {
    setSelectedContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedContent(null);
    setShowModal(false);
  };

  const renderTableRow = (item) => (
    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{item.id}</td>
      <td className="p-4 text-gray-700">{item.title}</td>
      <td className="p-4 text-gray-700">{item.type}</td>
      <td className="p-4 text-gray-700">{item.status}</td>
      <td className="p-4 text-gray-700">{item.updated}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(item)}
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
        <h1 className="text-4xl font-extrabold text-gray-900">Content Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage banners, blog posts, and site pages. Search and filter content to edit or update details.
        </p>
      </header>

      {/* Search and Filter Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="content-search" className="block text-lg text-gray-700 mb-2">
            Search by Title:
          </label>
          <input
            id="content-search"
            type="text"
            placeholder="e.g., Spring Collection Banner"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content-type" className="block text-lg text-gray-700 mb-2">
            Filter by Type:
          </label>
          <select
            id="content-type"
            value={filterType}
            onChange={handleTypeChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Banner">Banner</option>
            <option value="Page">Page</option>
            <option value="Blog Post">Blog Post</option>
          </select>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading content data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Content Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Last Updated</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600">
                      No content records found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => renderTableRow(item))
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

      {/* Content Details Modal */}
      {showModal && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Content Details (ID: {selectedContent.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Title:</strong> {selectedContent.title}</p>
              <p className="text-gray-700"><strong>Type:</strong> {selectedContent.type}</p>
              <p className="text-gray-700"><strong>Status:</strong> {selectedContent.status}</p>
              <p className="text-gray-700"><strong>Last Updated:</strong> {selectedContent.updated}</p>
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

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          Admin Content Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default AdminContentManagementDashboard;
