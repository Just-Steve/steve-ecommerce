import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy data for gift card offers and transactions
const dummyGiftCards = [
  {
    id: 1,
    title: "Birthday Bonus",
    description: "Receive a $10 bonus on your next gift card purchase.",
    bonus: 10,
    validUntil: "2025-05-31",
  },
  {
    id: 2,
    title: "Holiday Special",
    description: "Get 15% extra value when you buy a gift card of $50 or more.",
    bonus: 15,
    validUntil: "2025-12-31",
  },
];

const dummyTransactions = [
  {
    id: 101,
    date: "2025-03-01",
    description: "Gift card redeemed - $25",
    amount: -25,
  },
  {
    id: 102,
    date: "2025-03-10",
    description: "Gift card purchased - $50",
    amount: 50,
  },
  {
    id: 103,
    date: "2025-03-15",
    description: "Bonus applied for Birthday Bonus",
    amount: 10,
  },
];

const UserGiftCards = () => {
  const navigate = useNavigate();

  // State management for gift card dashboard
  const [balance, setBalance] = useState(0);
  const [offers, setOffers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States for redeeming a gift card
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemError, setRedeemError] = useState("");
  const [redeemSuccess, setRedeemSuccess] = useState("");

  // Pagination state for transactions history
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  // Simulate API call to fetch gift card data
  const fetchGiftCardData = async () => {
    try {
      setLoading(true);
      // Simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real scenario, fetch the data from an API
      setBalance(75.0);
      setOffers(dummyGiftCards);
      setTransactions(dummyTransactions);
      setLoading(false);
    } catch (err) {
      setError("Failed to load gift card data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftCardData();
  }, []);

  // Handler for redeeming a gift card
  const handleRedeem = async (e) => {
    e.preventDefault();
    setRedeemError("");
    setRedeemSuccess("");
    if (!redeemCode) {
      setRedeemError("Please enter a gift card code.");
      return;
    }
    setRedeemLoading(true);
    // Simulate API call to redeem gift card
    setTimeout(() => {
      // Simulated success: add bonus to balance if code is "BONUS2025"
      if (redeemCode.trim().toUpperCase() === "BONUS2025") {
        const bonusAmount = 20; // Simulated bonus amount
        setBalance((prev) => prev + bonusAmount);
        // Add a transaction record
        const newTransaction = {
          id: Date.now(),
          date: new Date().toISOString(),
          description: "Gift card redeemed bonus",
          amount: bonusAmount,
        };
        setTransactions((prev) => [newTransaction, ...prev]);
        setRedeemSuccess(`Gift card redeemed! Bonus of $${bonusAmount} added.`);
      } else {
        setRedeemError("Invalid gift card code. Please try again.");
      }
      setRedeemLoading(false);
      setRedeemCode("");
    }, 1500);
  };

  // Pagination calculations for transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date helper
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  // Render a single transaction row
  const renderTransactionRow = (transaction) => (
    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-gray-700">{formatDate(transaction.date)}</td>
      <td className="px-4 py-3 text-gray-700">{transaction.description}</td>
      <td className="px-4 py-3 text-gray-700">
        <span className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
          {transaction.amount >= 0 ? `+${transaction.amount}` : transaction.amount}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Gift Cards Dashboard</h1>
        <p className="text-xl text-gray-700 mt-4">
          View your current gift card balance, available offers, and transaction history.
        </p>
      </header>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-2xl text-gray-600">Loading gift card data...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Current Balance */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800">Your Gift Card Balance</h2>
            <p className="text-5xl text-green-600 font-extrabold mt-4">${balance.toFixed(2)}</p>
            <p className="text-gray-700 mt-2">
              Earn more points by shopping and redeem exclusive offers!
            </p>
          </section>

          {/* Available Offers */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Available Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">{offer.title}</h3>
                  <p className="text-gray-600 mt-2">{offer.description}</p>
                  <p className="text-gray-700 mt-4">
                    <span className="font-semibold">Bonus:</span> ${offer.bonus}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Valid Until:</span> {formatDate(offer.validUntil)}
                  </p>
                  <Link to={`/gift-offer/${offer.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Redeem Offer
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Redeem Gift Card Form */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Redeem a Gift Card</h2>
            <form onSubmit={handleRedeem} className="max-w-xl mx-auto space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Gift Card Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  placeholder="Enter your gift card code"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {redeemError && (
                <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                  {redeemError}
                </div>
              )}
              {redeemSuccess && (
                <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                  {redeemSuccess}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={redeemLoading}
                  className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                    redeemLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {redeemLoading ? "Redeeming..." : "Redeem"}
                </button>
              </div>
            </form>
          </section>

          {/* Gift Card Transactions History */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Gift Card Transactions</h2>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-600">No transactions available.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentTransactions.map((txn) => renderTransactionRow(txn))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                {transactions.length > transactionsPerPage && (
                  <div className="mt-6 flex justify-center items-center space-x-3">
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
                )}
              </>
            )}
          </section>
        </>
      )}

  

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Gift Cards &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserGiftCards;
