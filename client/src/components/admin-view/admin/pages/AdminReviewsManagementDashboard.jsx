import React, { useState, useEffect } from "react";

// Dummy review data for demonstration purposes
const dummyReviews = [
  {
    id: 501,
    product: "Elegant Red Dress",
    reviewer: "Alice Johnson",
    rating: 5,
    comment: "Absolutely stunning dress! The quality is amazing.",
    status: "Approved",
    reviewDate: "2023-03-16",
  },
  {
    id: 502,
    product: "Casual Blue Top",
    reviewer: "Bob Smith",
    rating: 4,
    comment: "Comfortable and stylish. Would recommend.",
    status: "Pending",
    reviewDate: "2023-03-15",
  },
  {
    id: 503,
    product: "Stylish Black Skirt",
    reviewer: "Carol Davis",
    rating: 3,
    comment: "Good product, but the fit was slightly off.",
    status: "Approved",
    reviewDate: "2023-03-14",
  },
  {
    id: 504,
    product: "Comfortable White Blouse",
    reviewer: "David Lee",
    rating: 2,
    comment: "Not as expected. The material feels cheap.",
    status: "Rejected",
    reviewDate: "2023-03-13",
  },
  {
    id: 505,
    product: "Flowy Floral Dress",
    reviewer: "Eva Green",
    rating: 5,
    comment: "Perfect for summer! Love the design and comfort.",
    status: "Approved",
    reviewDate: "2023-03-12",
  },
  {
    id: 506,
    product: "Elegant Black Heels",
    reviewer: "Frank Miller",
    rating: 4,
    comment: "Stylish and comfortable for a formal look.",
    status: "Pending",
    reviewDate: "2023-03-11",
  },
  // More dummy reviews can be added here...
];

const AdminReviewsManagementDashboard = () => {
  // States for reviews, search, filtering, sorting, pagination, and modal
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRating, setFilterRating] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch review data
  const fetchReviews = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setReviews(dummyReviews);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch review data.");
      setLoading(false);
    }
  };

  // Load reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handlers for search and filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleRatingChange = (e) => {
    setFilterRating(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter reviews based on search term (reviewer name), status, and rating
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : review.status === filterStatus;
    const matchesRating = filterRating === "All" ? true : review.rating.toString() === filterRating;
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Sort reviews by review date
  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.reviewDate) - new Date(b.reviewDate);
    } else {
      return new Date(b.reviewDate) - new Date(a.reviewDate);
    }
  });

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing detailed review information
  const openModal = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedReview(null);
    setShowModal(false);
  };

  // Render each table row for a review record
  const renderTableRow = (review) => (
    <tr key={review.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{review.product}</td>
      <td className="p-4 text-gray-700">{review.reviewer}</td>
      <td className="p-4 text-gray-700">{review.rating} / 5</td>
      <td className="p-4 text-gray-700">{review.status}</td>
      <td className="p-4 text-gray-700">{review.reviewDate}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(review)}
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
        <h1 className="text-4xl font-extrabold text-gray-900">Reviews Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage customer reviews and ratings for your products. Use the filters below to search, sort, and review feedback.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="review-search" className="block text-lg text-gray-700 mb-2">
            Search by Reviewer Name:
          </label>
          <input
            id="review-search"
            type="text"
            placeholder="e.g., Steve Ivar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="review-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="review-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="review-rating" className="block text-lg text-gray-700 mb-2">
            Filter by Rating:
          </label>
          <select
            id="review-rating"
            value={filterRating}
            onChange={handleRatingChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div>
          <label htmlFor="review-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Date:
          </label>
          <select
            id="review-sort"
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
          <p className="text-2xl text-gray-600">Loading reviews...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Reviews Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reviewer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentReviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  currentReviews.map((review) => renderTableRow(review))
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

      {/* Review Details Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Review Details (ID: {selectedReview.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Product:</strong> {selectedReview.product}</p>
              <p className="text-gray-700"><strong>Reviewer:</strong> {selectedReview.reviewer}</p>
              <p className="text-gray-700"><strong>Rating:</strong> {selectedReview.rating} / 5</p>
              <p className="text-gray-700"><strong>Status:</strong> {selectedReview.status}</p>
              <p className="text-gray-700"><strong>Date:</strong> {selectedReview.reviewDate}</p>
              <p className="text-gray-700"><strong>Comment:</strong> {selectedReview.comment}</p>
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
          Admin Reviews Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes and Additional Insights */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          Analyze customer feedback and monitor trends in review ratings. Detailed insights can help you adjust product offerings and customer service strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Rating Distribution</h4>
            <p className="text-gray-600">
              Visualize the spread of ratings across products. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Feedback Trends</h4>
            <p className="text-gray-600">
              Monitor customer comments to identify recurring issues or praises. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminReviewsManagementDashboard;
