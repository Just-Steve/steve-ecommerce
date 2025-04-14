import React, { useState, useEffect, useMemo } from "react";

// Fixed notifications that must be included exactly as provided
const fixedNotifications = [
  {
    id: 1,
    type: "Order",
    message:
      "New order received: ORD-3001. Check order details and process payment.",
    time: "09:45 AM",
    date: "2023-03-16",
    unread: true,
  },
  {
    id: 2,
    type: "Shipping",
    message:
      "Shipment delayed for ORD-2003. Contact the courier for updated delivery schedule.",
    time: "04:20 PM",
    date: "2023-03-15",
    unread: false,
  },
  {
    id: 3,
    type: "Promotion",
    message:
      "Promotion 'FLASH50' is expiring soon. Review campaign details and update as necessary.",
    time: "11:00 AM",
    date: "2023-03-15",
    unread: true,
  },
  {
    id: 4,
    type: "Return",
    message:
      "Return request received for ORD-1003. Please review the return details and initiate refund.",
    time: "03:15 PM",
    date: "2023-03-14",
    unread: false,
  },
];

// Array of notification types for generating additional messages
const notificationTypes = [
  "Order",
  "Shipping",
  "Promotion",
  "Return",
  "Feedback",
  "System Update",
  "Inventory",
  "Alert",
];

// Generate 46 additional notifications (ids from 5 to 50)
const generatedNotifications = Array.from({ length: 46 }, (_, i) => {
  const id = i + 5; // IDs 5 to 50
  const type = notificationTypes[i % notificationTypes.length];

  // Create a message based on the type
  let message = "";
  switch (type) {
    case "Order":
      message = `New order received: ORD-${3000 + id}. Check order details and process payment.`;
      break;
    case "Shipping":
      message = `Shipment update: Order ORD-${2000 + id} is on its way. Expected delivery soon.`;
      break;
    case "Promotion":
      message = `Promotion code 'SAVE${id}' is active. Use code at checkout for a discount.`;
      break;
    case "Return":
      message = `Return request received for Order ORD-${1000 + id}. Please review and process refund.`;
      break;
    case "Feedback":
      message = `Customer feedback received for Order ORD-${4000 + id}. Please review and address concerns.`;
      break;
    case "System Update":
      message = `System maintenance scheduled at 12:00 AM. Some services might be unavailable.`;
      break;
    case "Inventory":
      message = `Inventory alert: Product ${id} is low in stock. Consider reordering soon.`;
      break;
    case "Alert":
      message = `General alert for event ${id}. Check system for more details.`;
      break;
    default:
      message = `Notification for event ${id}.`;
  }

  // Generate a random time in "HH:MM AM/PM" format
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = Math.floor(Math.random() * 60);
  const time = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`;

  // Generate a random date in March 2023 (days 01-28)
  const day = Math.floor(Math.random() * 28) + 1;
  const date = `2023-03-${day.toString().padStart(2, "0")}`;

  // Randomly decide if the notification is unread
  const unread = Math.random() > 0.5;

  return { id, type, message, time, date, unread };
});

// Combine fixed notifications with generated ones to have 50 in total
const allDummyNotifications = [...fixedNotifications, ...generatedNotifications];

const AdminBigNotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 10 notifications per page

  // Simulate fetching notifications and merging with auto-generated low stock alerts
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Generate low stock notifications from dummy inventory
      const simulateLowStockNotifications = () => {
        const threshold = 5;
        return [
          ...[
            { id: 101, name: "Elegant Red Dress", stock: 3 },
            { id: 102, name: "Casual Blue Top", stock: 10 },
            { id: 103, name: "Comfortable White Blouse", stock: 2 },
            { id: 104, name: "Flowy Floral Dress", stock: 8 },
          ],
        ].reduce((acc, product) => {
          if (product.stock < threshold) {
            acc.push({
              id: 1000 + product.id,
              type: "Product Alert",
              message: `Low stock alert for '${product.name}'. Only ${product.stock} left! Please reorder ASAP.`,
              time: "Auto",
              date: new Date().toLocaleDateString(),
              unread: true,
            });
          }
          return acc;
        }, []);
      };

      const lowStockNotifs = simulateLowStockNotifications();
      // Merge our 50 dummy notifications with any low stock notifications
      const allNotifs = [...allDummyNotifications, ...lowStockNotifs];
      setNotifications(allNotifs);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch notifications.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, unread: false })));
  };

  // Pagination logic: determine the notifications for the current page
  const totalPages = Math.ceil(notifications.length / pageSize);
  const currentNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return notifications.slice(startIndex, startIndex + pageSize);
  }, [notifications, currentPage]);

  // Memoize the rendered notifications for performance
  const renderedNotifications = useMemo(
    () =>
      currentNotifications.map((notif) => (
        <div
          key={notif.id}
          className={`max-w-lg mx-auto my-4 p-4 rounded-xl shadow-lg border ${
            notif.unread
              ? "bg-white border-blue-500"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          {/* Header: Notification type and time */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold text-gray-800">{notif.type}</h4>
            <span className="text-sm text-gray-500">
              {notif.time} • {notif.date}
            </span>
          </div>
          {/* Message */}
          <p className="text-gray-700 leading-relaxed">{notif.message}</p>
          {/* Mark as Read Button */}
          {notif.unread && (
            <div className="mt-3 text-right">
              <button
                onClick={() => markAsRead(notif.id)}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                Mark as Read
              </button>
            </div>
          )}
        </div>
      )),
    [currentNotifications]
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Notifications & Alerts
        </h1>
        <p className="text-gray-600 mt-2 text-xl">
          Stay updated with real-time alerts. Critical product issues like low
          stock are prominently displayed along with order, shipping, promotions,
          and return notifications.
        </p>
        <div className="mt-4">
          <button
            onClick={markAllAsRead}
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md"
          >
            Mark All as Read
          </button>
        </div>
      </header>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-3xl text-gray-600">Loading notifications...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-600 text-xl">
                No notifications at the moment.
              </p>
            ) : (
              renderedNotifications
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 text-center">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 hover:text-gray-700 transition-colors"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 hover:text-gray-700 transition-colors"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t pt-6">
            <p className="text-center text-gray-500 text-base">
              Admin Notification System &copy; {new Date().getFullYear()} - All
              rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default AdminBigNotificationSystem;
