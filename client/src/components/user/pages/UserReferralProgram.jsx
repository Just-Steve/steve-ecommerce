import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Dummy data simulating referred friends
const dummyReferredFriends = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    referralDate: "2025-03-01",
    rewardEarned: 10,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    referralDate: "2025-03-05",
    rewardEarned: 15,
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    referralDate: "2025-03-10",
    rewardEarned: 10,
  },
];

const UserReferralProgram = () => {
  // State management for referral data and actions
  const [referralCode, setReferralCode] = useState("");
  const [referredFriends, setReferredFriends] = useState([]);
  const [friendEmail, setFriendEmail] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invitationSent, setInvitationSent] = useState(false);
  const [error, setError] = useState("");
  
  // Pagination state for referred friends list
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Simulate fetching referral data on mount
  const fetchReferralData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real application, referral code would be generated uniquely per user
      setReferralCode("REFERRAL2025XYZ");
      setReferredFriends(dummyReferredFriends);
      setLoading(false);
    } catch (err) {
      setError("Failed to load referral data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  // Handler for sending a referral invitation email
  const handleSendInvitation = async (e) => {
    e.preventDefault();
    setError("");
    setInvitationSent(false);
    if (!friendEmail) {
      setError("Please enter your friend's email.");
      return;
    }
    // Simulate API call to send referral invitation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInvitationSent(true);
      setFriendEmail("");
      // In a real application, update the referred friends list after sending invitation
    }, 1200);
  };

  // Pagination logic for referred friends
  const indexOfLastFriend = currentPage * itemsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - itemsPerPage;
  const currentFriends = referredFriends.slice(indexOfFirstFriend, indexOfLastFriend);
  const totalPages = Math.ceil(referredFriends.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date for display
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  // Render a single referred friend card (row)
  const renderFriendRow = (friend) => (
    <tr key={friend.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-gray-700">{friend.name}</td>
      <td className="px-4 py-3 text-gray-700">{friend.email}</td>
      <td className="px-4 py-3 text-gray-700">{formatDate(friend.referralDate)}</td>
      <td className="px-4 py-3 text-gray-700">
        <span className="text-green-600 font-semibold">${friend.rewardEarned}</span>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Referral Program</h1>
        <p className="text-xl text-gray-700 mt-4">
          Earn rewards by referring your friends and family.
        </p>
      </header>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-2xl text-gray-600">Loading referral data...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Referral Code Section */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Referral Code
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <p className="text-4xl text-green-600 font-extrabold mr-4">{referralCode}</p>
              <CopyToClipboard text={referralCode} onCopy={() => setShareCopied(true)}>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                  {shareCopied ? "Copied!" : "Copy Code"}
                </button>
              </CopyToClipboard>
            </div>
            <p className="text-gray-700 mt-4 text-center">
              Share this code with your friends to earn rewards.
            </p>
          </section>

          {/* Referral Invitation Form */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Refer a Friend
            </h2>
            <form onSubmit={handleSendInvitation} className="max-w-xl mx-auto space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Friend's Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="friend@example.com"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && (
                <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                  {error}
                </div>
              )}
              {invitationSent && (
                <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                  Invitation sent successfully!
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Sending..." : "Send Invitation"}
                </button>
              </div>
            </form>
          </section>

          {/* Referred Friends List */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              Referred Friends
            </h2>
            {referredFriends.length === 0 ? (
              <p className="text-center text-gray-600">No referrals yet.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                          Referred On
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                          Reward Earned
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentFriends.map((friend) => renderFriendRow(friend))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {referredFriends.length > itemsPerPage && (
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

        

          {/* Footer */}
          <footer className="mt-16 border-t pt-6">
            <p className="text-center text-gray-500 text-base">
              User Referral Program &copy; {new Date().getFullYear()} - All rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default UserReferralProgram;
