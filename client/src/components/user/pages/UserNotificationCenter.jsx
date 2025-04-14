import React, { useState, useEffect } from "react";

// Dummy notification data for demonstration purposes
const dummyNotifications = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order ORD1234 has been shipped and is on its way!",
    date: "2025-03-20T10:15:00Z",
    read: false,
  },
  {
    id: 2,
    title: "New Promotion",
    message: "Get 20% off on your next purchase with code SAVE20.",
    date: "2025-03-19T14:30:00Z",
    read: true,
  },
  {
    id: 3,
    title: "Order Delivered",
    message: "Your order ORD1235 was delivered successfully.",
    date: "2025-03-18T09:00:00Z",
    read: true,
  },
  {
    id: 4,
    title: "Account Update",
    message: "Your profile information was updated successfully.",
    date: "2025-03-17T16:45:00Z",
    read: false,
  },
  {
    id: 5,
    title: "New Review Received",
    message: "You received a new review for your recent purchase.",
    date: "2025-03-16T12:20:00Z",
    read: false,
  },
  {
    id: 6,
    title: "System Maintenance",
    message: "Scheduled maintenance will occur on 2025-03-25 from 1 AM to 3 AM.",
    date: "2025-03-15T08:00:00Z",
    read: true,
  },
  // Add more notifications as needed
];

const UserNotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // All, Read, Unread
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate API call to fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotifications(dummyNotifications);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch notifications.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handler for filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  // Toggle notification read status
  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  // Filter notifications based on search term and filter status
  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All"
        ? true
        : filterStatus === "Read"
        ? notif.read
        : !notif.read;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date to readable string
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Notification Center
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Stay updated with the latest alerts and messages.
        </p>
      </header>

      {/* Search and Filter Section */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label
            htmlFor="notification-search"
            className="block text-lg text-gray-700 mb-2"
          >
            Search Notifications:
          </label>
          <input
            id="notification-search"
            type="text"
            placeholder="Search by title or message..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="notification-filter"
            className="block text-lg text-gray-700 mb-2"
          >
            Filter by Status:
          </label>
          <select
            id="notification-filter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Read">Read</option>
            <option value="Unread">Unread</option>
          </select>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading notifications...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Notifications List */}
          <section className="mb-10">
            {filteredNotifications.length === 0 ? (
              <p className="text-center text-gray-600 py-10">
                No notifications found.
              </p>
            ) : (
              <div className="space-y-4">
                {currentNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-6 bg-white rounded-lg shadow-md border ${
                      notif.read ? "border-gray-300" : "border-blue-500"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {notif.title}
                      </h2>
                      <button
                        onClick={() => toggleReadStatus(notif.id)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          notif.read
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                      >
                        {notif.read ? "Mark Unread" : "Mark Read"}
                      </button>
                    </div>
                    <p className="text-gray-700 mt-2">{notif.message}</p>
                    <p className="text-gray-500 text-sm mt-4">
                      {formatDate(notif.date)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Pagination Controls */}
          {filteredNotifications.length > notificationsPerPage && (
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
          )}
        </>
      )}

  

      {/* Footer Section */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Notification Center &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserNotificationCenter;
