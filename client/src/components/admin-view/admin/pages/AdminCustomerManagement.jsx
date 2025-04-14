import React, { useState, useEffect } from "react";

const dummyCustomers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "078 123-4567",
    registered: "2025-01-15",
    orders: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "078 234-5678",
    registered: "07-12-2025",
    orders: 3,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "078 345-6789",
    registered: "2025-02-10",
    orders: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "078 456-7890",
    registered: "2022-11-05",
    orders: 2,
    status: "Active",
  },
  {
    id: 5,
    name: "Eva Green",
    email: "eva.green@example.com",
    phone: "078 567-8901",
    registered: "2025-03-01",
    orders: 7,
    status: "Active",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    phone: "078 678-9012",
    registered: "2025-01-28",
    orders: 4,
    status: "Inactive",
  },
  // More dummy customers can be added here
];

const AdminCustomerManagement = () => {
  // States for customers data, filters, pagination, etc.
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Simulate API call to fetch customer data
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // Simulated delay to mimic API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCustomers(dummyCustomers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch customer data.");
      setLoading(false);
    }
  };

  // Fetch customers when component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handler for filtering customers by status
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  // Handler for sorting by registration date
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter customers based on search term and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort customers by registration date
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.registered) - new Date(b.registered);
    } else {
      return new Date(b.registered) - new Date(a.registered);
    }
  });

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing customer details
  const openCustomerModal = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const closeCustomerModal = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(false);
  };

  // Render a table row for each customer
  const renderCustomerRow = (customer) => (
    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 font-medium text-gray-800">{customer.id}</td>
      <td className="p-4 text-gray-700">{customer.name}</td>
      <td className="p-4 text-gray-700">{customer.email}</td>
      <td className="p-4 text-gray-600">{customer.phone}</td>
      <td className="p-4 text-gray-600">{customer.registered}</td>
      <td className="p-4 text-gray-600">{customer.orders}</td>
      <td className="p-4 text-gray-600">{customer.status}</td>
      <td className="p-4">
        <button
          onClick={() => openCustomerModal(customer)}
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
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">Customer Management</h1>
        <div>
          <button onClick={fetchCustomers} className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg hover:bg-indigo-700 transition-colors shadow-lg">
            Refresh Customers
          </button>
        </div>
      </header>

      {/* Search, Filter, & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="customer-search" className="block text-lg text-gray-700 mb-2">
            Search by Name:
          </label>
          <input
            id="customer-search"
            type="text"
            placeholder="Enter customer name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="customer-status" className="block text-lg text-gray-700 mb-2">
            Filter by Status:
          </label>
          <select
            id="customer-status"
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
          <label htmlFor="customer-sort" className="block text-lg text-gray-700 mb-2">
            Sort by Registration:
          </label>
          <select
            id="customer-sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </section>

      {/* Loading, Error, and Table Section */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading customers...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Registered</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Orders</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentCustomers.map((customer) => renderCustomerRow(customer))}
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

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Customer Details (ID: {selectedCustomer.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Name:</strong> {selectedCustomer.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {selectedCustomer.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {selectedCustomer.phone}
              </p>
              <p className="text-gray-700">
                <strong>Registered:</strong> {selectedCustomer.registered}
              </p>
              <p className="text-gray-700">
                <strong>Orders:</strong> {selectedCustomer.orders}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {selectedCustomer.status}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeCustomerModal}
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
          Admin Customer Management &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          This section provides additional insights into customer behavior, such as the most active customers, average order frequency, and trends in customer registrations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Top Active Customers</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel eros eu justo tristique consequat.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Registration Trends</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed ac nibh at nisi pulvinar faucibus.
            </p>
          </div>
        </div>
    
      </section>
    </div>
  );
};

export default AdminCustomerManagement;
