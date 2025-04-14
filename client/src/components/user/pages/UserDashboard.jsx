import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLogoutButton from "../pages/UserLogoutButton";

const dummyUser = {
  name: "Steve Ivar",
  email: "stevegichuhi@example.com",
  joined: "March 2024",
};

const dummyOrders = [
  { id: "ORD1234", date: "2025-03-20", amount: 120.99, status: "Completed" },
  { id: "ORD1235", date: "2025-03-18", amount: 85.50, status: "Processing" },
  { id: "ORD1236", date: "2025-03-15", amount: 45.00, status: "Pending" },
  { id: "ORD1237", date: "2025-03-10", amount: 65.75, status: "Completed" },
  { id: "ORD1238", date: "2025-03-08", amount: 99.99, status: "Shipped" },
  { id: "ORD1239", date: "2025-03-05", amount: 54.20, status: "Processing" },
  { id: "ORD1240", date: "2025-03-02", amount: 110.30, status: "Pending" },
  { id: "ORD1241", date: "2025-02-28", amount: 75.00, status: "Completed" },
  { id: "ORD1242", date: "2025-02-25", amount: 200.15, status: "Shipped" },
  { id: "ORD1243", date: "2025-02-22", amount: 33.45, status: "Cancelled" },
  { id: "ORD1244", date: "2025-02-19", amount: 98.99, status: "Processing" },
  { id: "ORD1245", date: "2025-02-15", amount: 150.00, status: "Pending" },
  { id: "ORD1246", date: "2025-02-10", amount: 87.60, status: "Completed" },
  { id: "ORD1247", date: "2025-02-08", amount: 45.80, status: "Processing" },
  { id: "ORD1248", date: "2025-02-05", amount: 250.50, status: "Shipped" },
  { id: "ORD1249", date: "2025-02-02", amount: 130.90, status: "Cancelled" },
  { id: "ORD1250", date: "2025-01-30", amount: 76.99, status: "Completed" },
  { id: "ORD1251", date: "2025-01-28", amount: 45.00, status: "Processing" },
  { id: "ORD1252", date: "2025-01-25", amount: 99.00, status: "Pending" },
  { id: "ORD1253", date: "2025-01-20", amount: 120.25, status: "Shipped" },
  { id: "ORD1254", date: "2025-01-18", amount: 59.75, status: "Completed" },
  { id: "ORD1255", date: "2025-01-15", amount: 79.90, status: "Cancelled" },
  { id: "ORD1256", date: "2025-01-10", amount: 68.45, status: "Processing" },
  { id: "ORD1257", date: "2025-01-05", amount: 140.30, status: "Shipped" },
  { id: "ORD1258", date: "2025-01-02", amount: 99.99, status: "Pending" },
  { id: "ORD1259", date: "2024-12-28", amount: 199.50, status: "Completed" },
  { id: "ORD1260", date: "2024-12-25", amount: 110.00, status: "Processing" },
  { id: "ORD1261", date: "2024-12-22", amount: 175.20, status: "Cancelled" },
  { id: "ORD1262", date: "2024-12-18", amount: 80.99, status: "Shipped" },
  { id: "ORD1263", date: "2024-12-15", amount: 49.25, status: "Completed" }
];

const ProfileSummary = ({ user }) => (
  <section className="mb-8 p-6 bg-transparent rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800">Your Profile</h2>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-gray-700">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700">
          <strong>Joined:</strong> {user.joined}
        </p>
      </div>
      <div className="flex justify-end">
        <Link to="/profile">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  </section>
);

const StatsCard = ({ title, value, color }) => (
  <div className="bg-transparent p-6 rounded-lg shadow-md border relative">
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className={`text-3xl mt-2 ${color}`}>{value}</p>
  </div>
);

const RecentOrders = ({ orders }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Recent Orders
    </h2>
    <div className="overflow-x-auto bg-transparent shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Order ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="p-4 text-gray-700">{order.id}</td>
              <td className="p-4 text-gray-700">{order.date}</td>
              <td className="p-4 text-gray-700">
                ${order.amount.toFixed(2)}
              </td>
              <td
                className={`p-4 font-semibold ${
                  order.status === "Completed"
                    ? "text-green-600"
                    : order.status === "Processing"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const UserDashboard = () => {
  const [user] = useState(dummyUser);
  const [orders] = useState(dummyOrders);
  const [loading, setLoading] = useState(true);
  const [showCover, setShowCover] = useState(true);

  // Simulate dashboard data fetching delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show cover page video for 5 seconds before displaying dashboard
  useEffect(() => {
    const coverTimer = setTimeout(() => setShowCover(false), 1000);
    return () => clearTimeout(coverTimer);
  }, []);

  // Use useMemo to optimize calculations
  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2),
    [orders]
  );
  const pendingPayments = useMemo(
    () => orders.filter((order) => order.status === "Pending").length,
    [orders]
  );
  const totalOrders = orders.length;

  // If still showing cover page, render the cover video only
  if (showCover) {
    return (
      <div className="relative h-screen w-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/MPaEbz-/videoblocks-no-people-dolly-shot-of-casual-clothes-at-sale-section-in-modern-clothing-store-of-big-shopping-centre_s-o8g04fu__a8d3647e4fce78ba90f98f93c3ea654f__P360.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold">Welcome</h1>
        </div>
      </div>
    );
  }

  // Show loading state if data is still being "fetched"
  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="relative p-8 bg-gray-100 min-h-screen">
      {/* Background Video Overlay */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
        autoPlay
        loop
        muted
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            User Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}! Here’s an overview of your account.
          </p>
        </header>

        {/* Profile Summary */}
        <ProfileSummary user={user} />

        {/* Quick Stats */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Orders"
            value={totalOrders}
            color="text-blue-600"
          />
          <StatsCard
            title="Total Spent"
            value={`$${totalSpent}`}
            color="text-green-600"
          />
          <StatsCard
            title="Pending Payments"
            value={pendingPayments}
            color="text-red-600"
          />
        </section>

        {/* Recent Orders */}
        <RecentOrders orders={orders} />

        {/* Logout Button */}
        <section className="text-center mt-10">
          <UserLogoutButton />
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t pt-6">
          <p className="text-center text-gray-500 text-base">
            User Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;
