import React, { useState, useEffect } from "react";


// Dummy shipment data for demonstration purposes
const dummyShipments = [
  {
    id: 301,
    orderId: "ORD-2001",
    customer: "Alice Johnson",
    carrier: "FastShip Express",
    trackingNumber: "FSX123456789",
    status: "In Transit",
    shippedDate: "2023-03-16",
    estimatedDelivery: "2023-03-20",
  },
  {
    id: 302,
    orderId: "ORD-2002",
    customer: "Bob Smith",
    carrier: "Speedy Delivery",
    trackingNumber: "SPD987654321",
    status: "Delivered",
    shippedDate: "2023-03-15",
    estimatedDelivery: "2023-03-18",
  },
  {
    id: 303,
    orderId: "ORD-2003",
    customer: "Carol Davis",
    carrier: "Global Courier",
    trackingNumber: "GC456789123",
    status: "Delayed",
    shippedDate: "2023-03-14",
    estimatedDelivery: "2023-03-19",
  },
  {
    id: 304,
    orderId: "ORD-2004",
    customer: "David Lee",
    carrier: "FastShip Express",
    trackingNumber: "FSX112233445",
    status: "In Transit",
    shippedDate: "2023-03-13",
    estimatedDelivery: "2023-03-17",
  },
  {
    id: 305,
    orderId: "ORD-2005",
    customer: "Eva Green",
    carrier: "Speedy Delivery",
    trackingNumber: "SPD556677889",
    status: "Delivered",
    shippedDate: "2023-03-12",
    estimatedDelivery: "2023-03-15",
  },
  {
    id: 306,
    orderId: "ORD-2006",
    customer: "Frank Miller",
    carrier: "Global Courier",
    trackingNumber: "GC998877665",
    status: "Pending",
    shippedDate: "2023-03-11",
    estimatedDelivery: "2023-03-16",
  },
  // Add more dummy shipments as needed
];

const AdminShippingManagementDashboard = () => {
  // States for shipment data and filtering
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const shipmentsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch shipment data
  const fetchShipments = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setShipments(dummyShipments);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch shipment data.");
      setLoading(false);
    }
  };

  // Load shipment data on component mount
  useEffect(() => {
    fetchShipments();
  }, []);

  // Handler for search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handler for filtering by shipment status
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  // Handler for sorting by shipped date
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter shipments based on search term (order ID or tracking number) and status
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : shipment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort shipments by shipped date
  const sortedShipments = filteredShipments.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.shippedDate) - new Date(b.shippedDate);
    } else {
      return new Date(b.shippedDate) - new Date(a.shippedDate);
    }
  });

  // Pagination logic
  const indexOfLastShipment = currentPage * shipmentsPerPage;
  const indexOfFirstShipment = indexOfLastShipment - shipmentsPerPage;
  const currentShipments = sortedShipments.slice(indexOfFirstShipment, indexOfLastShipment);
  const totalPages = Math.ceil(sortedShipments.length / shipmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing shipment details
  const openModal = (shipment) => {
    setSelectedShipment(shipment);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedShipment(null);
    setShowModal(false);
  };

  // Render each table row for a shipment record
  const renderTableRow = (shipment) => (
    <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{shipment.orderId}</td>
      <td className="p-4 text-gray-700">{shipment.customer}</td>
      <td className="p-4 text-gray-700">{shipment.carrier}</td>
      <td className="p-4 text-gray-700">{shipment.trackingNumber}</td>
      <td className="p-4 text-gray-700">{shipment.status}</td>
      <td className="p-4 text-gray-700">{shipment.shippedDate}</td>
      <td className="p-4 text-gray-700">{shipment.estimatedDelivery}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(shipment)}
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
        <h1 className="text-4xl font-extrabold text-gray-900">Shipping Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage shipping information. Use the filters below to refine your shipment data.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="shipment-search" className="block text-lg text-gray-700 mb-2">
            Search (Order ID or Tracking Number):
          </label>
          <input
            id="shipment-search"
            type="text"
            placeholder="e.g., ORD-2001 or FSX123456789"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="shipment-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="shipment-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <label htmlFor="shipment-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Shipped Date:
          </label>
          <select
            id="shipment-sort"
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
          <p className="text-2xl text-gray-600">Loading shipment data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Shipments Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Carrier</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tracking #</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Shipped Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Est. Delivery</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentShipments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-gray-600">
                      No shipment records found.
                    </td>
                  </tr>
                ) : (
                  currentShipments.map((shipment) => renderTableRow(shipment))
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

      {/* Shipment Details Modal */}
      {showModal && selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Shipment Details (Order: {selectedShipment.orderId})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Customer:</strong> {selectedShipment.customer}</p>
              <p className="text-gray-700"><strong>Carrier:</strong> {selectedShipment.carrier}</p>
              <p className="text-gray-700"><strong>Tracking Number:</strong> {selectedShipment.trackingNumber}</p>
              <p className="text-gray-700"><strong>Status:</strong> {selectedShipment.status}</p>
              <p className="text-gray-700"><strong>Shipped Date:</strong> {selectedShipment.shippedDate}</p>
              <p className="text-gray-700"><strong>Estimated Delivery:</strong> {selectedShipment.estimatedDelivery}</p>
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
          Admin Shipping Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes and Additional Insights */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          This section provides extra context about shipment trends, carrier performance, and delivery efficiency. Analyze key metrics and trends to improve logistics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Carrier Performance</h4>
            <p className="text-gray-600">
              Review average delivery times and on-time performance for each carrier. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Delivery Efficiency</h4>
            <p className="text-gray-600">
              Analyze delays and identify potential areas for improvement in the shipping process. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
   
      </section>
    </div>
  );
};

export default AdminShippingManagementDashboard;
