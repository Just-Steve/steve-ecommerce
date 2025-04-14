import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy data simulating loyalty information
const dummyLoyaltyData = {
  currentPoints: 1250,
  availableOffers: [
    { id: 1, title: "10% Off Your Next Purchase", description: "Redeem 500 points for a 10% discount.", pointsRequired: 500, validUntil: "2025-04-30" },
    { id: 2, title: "Free Shipping", description: "Redeem 300 points for free shipping.", pointsRequired: 300, validUntil: "2025-05-15" },
    { id: 3, title: "$20 Cashback", description: "Redeem 800 points for $20 cashback on orders over $100.", pointsRequired: 800, validUntil: "2025-05-31" },
    { id: 4, title: "Exclusive VIP Access", description: "Redeem 1000 points for exclusive shopping events.", pointsRequired: 1000, validUntil: "2025-06-10" },
    { id: 5, title: "Buy One Get One Free", description: "Redeem 700 points for a BOGO offer on selected items.", pointsRequired: 700, validUntil: "2025-06-20" },
    { id: 6, title: "$50 Gift Card", description: "Redeem 2000 points for a $50 store gift card.", pointsRequired: 2000, validUntil: "2025-07-01" },
    { id: 7, title: "Early Access to Sales", description: "Redeem 600 points for early access to upcoming sales.", pointsRequired: 600, validUntil: "2025-07-15" },
    { id: 8, title: "$5 Store Credit", description: "Redeem 400 points for $5 store credit.", pointsRequired: 400, validUntil: "2025-07-20" },
    { id: 9, title: "Limited Edition Merchandise", description: "Redeem 1500 points for exclusive store merchandise.", pointsRequired: 1500, validUntil: "2025-08-01" },
    { id: 10, title: "Double Points for a Month", description: "Redeem 1200 points to earn double rewards for a month.", pointsRequired: 1200, validUntil: "2025-08-15" },
    { id: 11, title: "Personalized Shopping Assistance", description: "Redeem 1800 points for one-on-one shopping help.", pointsRequired: 1800, validUntil: "2025-08-30" },
    { id: 12, title: "Mystery Box Surprise", description: "Redeem 1300 points for a surprise gift box!", pointsRequired: 1300, validUntil: "2025-09-10" },
  ],
  transactions: [
    {
      id: 1,
      date: "2025-03-01",
      description: "Earned points for purchase ORD1234",
      points: 200,
      type: "earn",
    },
    {
      id: 2,
      date: "2025-03-05",
      description: "Redeemed points for 10% discount",
      points: -500,
      type: "redeem",
    },
    {
      id: 3,
      date: "2025-03-10",
      description: "Earned points for purchase ORD1235",
      points: 150,
      type: "earn",
    },
    {
      id: 4,
      date: "2025-03-15",
      description: "Earned points for review",
      points: 50,
      type: "earn",
    },
    {
      id: 5,
      date: "2025-03-20",
      description: "Redeemed points for free shipping",
      points: -300,
      type: "redeem",
    },
    {
      id: 1,
      date: "2025-03-01",
      description: "Earned points for purchase ORD1234",
      points: 200,
      type: "earn",
    },
    {
      id: 2,
      date: "2025-03-05",
      description: "Redeemed points for 10% discount",
      points: -500,
      type: "redeem",
    },
    {
      id: 3,
      date: "2025-03-10",
      description: "Earned points for purchase ORD1235",
      points: 150,
      type: "earn",
    },
    {
      id: 4,
      date: "2025-03-15",
      description: "Earned points for review",
      points: 50,
      type: "earn",
    },
    {
      id: 5,
      date: "2025-03-20",
      description: "Redeemed points for free shipping",
      points: -300,
      type: "redeem",
    },
  ],
};

const UserLoyaltyProgram = () => {
  // State management for loyalty program data
  const [currentPoints, setCurrentPoints] = useState(0);
  const [offers, setOffers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state for transactions
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  // Simulate fetching loyalty program data
  const fetchLoyaltyData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentPoints(dummyLoyaltyData.currentPoints);
      setOffers(dummyLoyaltyData.availableOffers);
      setTransactions(dummyLoyaltyData.transactions);
      setLoading(false);
    } catch (err) {
      setError("Failed to load loyalty program data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  // Pagination logic for transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date for display
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  // Render a single offer card
  const renderOfferCard = (offer) => (
    <div key={offer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800">{offer.title}</h3>
      <p className="text-gray-600 mt-2">{offer.description}</p>
      <p className="text-gray-700 mt-4">
        <span className="font-semibold">Points Required:</span> {offer.pointsRequired}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Valid Until:</span> {formatDate(offer.validUntil)}
      </p>
      <Link to="#" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Redeem Offer
      </Link>
    </div>
  );

  // Render a single transaction row
  const renderTransactionRow = (transaction) => (
    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-gray-700">{formatDate(transaction.date)}</td>
      <td className="px-4 py-3 text-gray-700">{transaction.description}</td>
      <td className="px-4 py-3 text-gray-700">
        <span className={transaction.type === "earn" ? "text-green-600" : "text-red-600"}>
          {transaction.points > 0 ? `+${transaction.points}` : transaction.points}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Loyalty Program</h1>
        <p className="text-xl text-gray-700 mt-4">
          Earn reward points and enjoy exclusive offers every time you shop with us.
        </p>
      </header>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-2xl text-gray-600">Loading loyalty data...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Current Points Summary */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800">Your Reward Points</h2>
            <p className="text-5xl text-green-600 font-extrabold mt-4">{currentPoints}</p>
            <p className="text-gray-700 mt-2">
              Keep shopping to earn more points and unlock exciting offers!
            </p>
          </section>

          {/* Available Offers Section */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Available Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer) => renderOfferCard(offer))}
            </div>
          </section>

          {/* Points Transactions History */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Points History</h2>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-600">No transactions found.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentTransactions.map((txn) => renderTransactionRow(txn))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {transactions.length > transactionsPerPage && (
                  <div className="mt-6 flex justify-center items-center space-x-3">
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
                )}
              </>
            )}
          </section>
        </>
      )}

   

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Loyalty Program &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserLoyaltyProgram;
