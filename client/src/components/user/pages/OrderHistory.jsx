import { useState } from "react";

// Dummy order history data
const dummyOrders = [
  {
    orderId: "ORD001",
    date: "2025-03-10",
    status: "Delivered",
    total: 159.99,
    items: [
      { name: "Chic Summer Dress", price: 79.99, quantity: 1 },
      { name: "Casual White Sneakers", price: 80.00, quantity: 1 },
    ],
  },
  {
    orderId: "ORD002",
    date: "2025-03-15",
    status: "Shipped",
    total: 249.99,
    items: [
      { name: "Elegant Red Gown", price: 129.99, quantity: 1 },
      { name: "Gold Necklace Set", price: 120.00, quantity: 1 },
    ],
  },
  {
    orderId: "ORD003",
    date: "2025-03-20",
    status: "Processing",
    total: 99.99,
    items: [
      { name: "Casual Blue Top", price: 39.99, quantity: 1 },
      { name: "Stylish Black Skirt", price: 59.99, quantity: 1 },
    ],
  },
  {
    orderId: "ORD001",
    date: "2025-03-10",
    status: "Delivered",
    total: 159.99,
    items: [
      { name: "Chic Summer Dress", price: 79.99, quantity: 1 },
      { name: "Casual White Sneakers", price: 80.00, quantity: 1 },
    ],
  },
  {
    orderId: "ORD002",
    date: "2025-03-15",
    status: "Shipped",
    total: 249.99,
    items: [
      { name: "Elegant Red Gown", price: 129.99, quantity: 1 },
      { name: "Gold Necklace Set", price: 120.00, quantity: 1 },
    ],
  },
  {
    orderId: "ORD003",
    date: "2025-03-20",
    status: "Processing",
    total: 99.99,
    items: [
      { name: "Casual Blue Top", price: 39.99, quantity: 1 },
      { name: "Stylish Black Skirt", price: 59.99, quantity: 1 },
    ],
  },
];

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Order History</h1>
      <div className="space-y-6">
        {dummyOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Order #{order.orderId}</h2>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className={`text-lg font-bold ${order.status === "Delivered" ? "text-green-600" : order.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}`}>
                  {order.status}
                </p>
              </div>
              <div className="text-xl font-bold">${order.total.toFixed(2)}</div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => toggleOrderDetails(order.orderId)}
              >
                {expandedOrder === order.orderId ? "Hide Details" : "View Details"}
              </button>
            </div>
            {expandedOrder === order.orderId && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-xl font-semibold mb-3">Items Purchased:</h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between text-lg">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
