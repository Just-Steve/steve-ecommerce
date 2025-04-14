import React, { useState, useEffect } from "react";

// Utility functions to generate random data
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDateInMarch2025() {
  // Random day from 1 to 31 (for simplicity, we assume March has 31 days)
  const day = Math.floor(Math.random() * 31) + 1;
  return `2025-03-${String(day).padStart(2, "0")}`; // e.g. "2025-03-05"
}

function generateRandomPayments(count = 50) {
  const paymentMethods = ["Credit Card", "PayPal", "M-Pesa", "Debit Card"];
  const statuses = ["Completed", "Pending", "Failed"];
  const payments = [];

  for (let i = 1; i <= count; i++) {
    const amount = parseFloat((Math.random() * (200 - 10) + 10).toFixed(2)); // 10.00 - 200.00
    const randomDigits = Math.floor(Math.random() * 9000) + 1000; // 1000-9999

    payments.push({
      id: i,
      date: getRandomDateInMarch2025(),
      amount,
      method: getRandomElement(paymentMethods),
      status: getRandomElement(statuses),
      transactionId: `TXN${randomDigits}`,
    });
  }

  return payments;
}

// Return a Tailwind class for the payment status
function getStatusClass(status) {
  switch (status) {
    case "Completed":
      return "text-green-600 font-semibold";
    case "Pending":
      return "text-yellow-600 font-semibold";
    case "Failed":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-700";
  }
}

const UserPayments = () => {
  // States for payments data and filtering/pagination
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for modal to view payment details
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Simulate fetching payments data from an API
  const fetchPayments = async () => {
    try {
      setLoading(true);
      // Simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Generate 50 random payments
      const randomPayments = generateRandomPayments(50);
      setPayments(randomPayments);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch payment transactions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handlers for search and filtering
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ? true : payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate summary metrics
  const totalPaid = filteredPayments
    .filter((p) => p.status === "Completed")
    .reduce((acc, p) => acc + p.amount, 0)
    .toFixed(2);

  const pendingPaymentsCount = filteredPayments.filter(
    (p) => p.status === "Pending"
  ).length;

  // Modal controls
  const openPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setSelectedPayment(null);
    setShowPaymentModal(false);
  };

  // Render table row for each payment record
  const renderPaymentRow = (payment) => (
    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{payment.date}</td>
      <td className="p-4 text-gray-700">${payment.amount.toFixed(2)}</td>
      <td className="p-4 text-gray-700">{payment.method}</td>
      {/* Status cell with color based on status */}
      <td className={`p-4 ${getStatusClass(payment.status)}`}>
        {payment.status}
      </td>
      <td className="p-4 text-gray-700">{payment.transactionId}</td>
      <td className="p-4">
        <button
          onClick={() => openPaymentModal(payment)}
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
        <h1 className="text-4xl font-extrabold text-gray-900">
          Payments Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Review your payment history, check pending transactions, and track
          your spending.
        </p>
      </header>

      {/* Summary Metrics */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-2xl font-bold text-gray-800">Total Paid</h3>
          <p className="text-3xl text-green-600 mt-2">${totalPaid}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-2xl font-bold text-gray-800">Pending Payments</h3>
          <p className="text-3xl text-red-600 mt-2">{pendingPaymentsCount}</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="payment-search"
            className="block text-lg text-gray-700 mb-2"
          >
            Search by Transaction or Method:
          </label>
          <input
            id="payment-search"
            type="text"
            placeholder="e.g., TXN1001 or Credit Card"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="payment-status"
            className="block text-lg text-gray-700 mb-2"
          >
            Filter by Status:
          </label>
          <select
            id="payment-status"
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchPayments}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Refresh Data
          </button>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading payments...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Payments Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPayments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600">
                      No payment records found.
                    </td>
                  </tr>
                ) : (
                  currentPayments.map((payment) => renderPaymentRow(payment))
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

      {/* Payment Details Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Payment Details (ID: {selectedPayment.transactionId})
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Date:</strong> {selectedPayment.date}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Amount:</strong> ${selectedPayment.amount.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Method:</strong> {selectedPayment.method}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong>{" "}
              <span className={getStatusClass(selectedPayment.status)}>
                {selectedPayment.status}
              </span>
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closePaymentModal}
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
          User Payments Dashboard &copy; {new Date().getFullYear()} - All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserPayments;
