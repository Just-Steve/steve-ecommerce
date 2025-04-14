import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Extended dummy order confirmation data
// In a real application, you'd fetch this from your backend or an API
const dummyOrderConfirmation = {
  orderId: "ORD9876",
  orderDate: "2025-04-01",
  estimatedDelivery: "2025-04-07",
  customer: {
    name: "Sarah Smith",
    address: "456 Fashion Ave, Nairobi, NY 10001",
    email: "sarah.smith@example.com",
    phone: "0768 123-4567",
  },
  items: [
    {
      id: 101,
      name: "Summer Floral Dress",
      quantity: 1,
      price: 89.99,
      // Using Unsplash query for women's floral dress
      imageUrl: "https://shopzetu.com/cdn/shop/files/h7wdhsBnt0_360x.jpg?v=1742536685",
    },
    {
      id: 102,
      name: "White Lace Blouse",
      quantity: 2,
      price: 49.99,
      // Using Unsplash query for women's lace blouse
      imageUrl: "https://shopzetu.com/cdn/shop/files/o3itobhgKB_360x.jpg?v=1742480026",
    },
    {
      id: 103,
      name: "High-Waisted Jeans",
      quantity: 1,
      price: 59.99,
      // Using Unsplash query for women's high-waisted jeans
      imageUrl: "https://shopzetu.com/cdn/shop/files/r3kCOlAaew_360x.jpg?v=1742296647",
    },
    {
      id: 104,
      name: "Classic Black Heels",
      quantity: 1,
      price: 74.99,
      // Using Unsplash query for women's black heels
      imageUrl: "https://shopzetu.com/cdn/shop/files/aE0cOnKQlT_360x.jpg?v=1741965796",
    },
  ],
  pricing: {
    subtotal: 324.95,
    shipping: 15.0,
    total: 339.95,
  },
};

const UserOrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(50);

  // Simulate API call to fetch order confirmation details
  const fetchOrderConfirmation = async () => {
    try {
      setLoading(true);
      // Simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrderData(dummyOrderConfirmation);
      setLoading(false);
    } catch (err) {
      setError("Failed to load order confirmation details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderConfirmation();
  }, []);

  // Countdown timer for auto-redirect to order history (or homepage)
  useEffect(() => {
    if (!loading && orderData) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/orders");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, orderData, navigate]);

  // Render each purchased item in a row
  const renderItem = (item) => (
    <div
      key={item.id}
      className="flex flex-col md:flex-row items-center border-b border-gray-200 py-4"
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full md:w-24 md:h-24 object-cover rounded-lg mr-4 mb-4 md:mb-0"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">Quantity: {item.quantity}</p>
      </div>
      <div className="text-xl font-semibold text-green-600">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="py-20 text-center">
          <p className="text-2xl text-gray-600">Loading your order confirmation...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        orderData && (
          <>
            {/* Thank You Message */}
            <header className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
                Thank You for Your Purchase!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mt-4">
                Your order{" "}
                <span className="font-bold">{orderData.orderId}</span> was
                placed successfully on{" "}
                <span className="font-bold">{orderData.orderDate}</span>.
              </p>
            </header>

            {/* Order Summary Section */}
            <section className="mb-10 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Purchased Items */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Purchased Items
                  </h3>
                  <div className="space-y-4">
                    {orderData.items.map((item) => renderItem(item))}
                  </div>
                </div>
                {/* Pricing Details */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Pricing Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-gray-700">Subtotal:</p>
                      <p className="text-gray-900 font-semibold">
                        ${orderData.pricing.subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-700">Shipping:</p>
                      <p className="text-gray-900 font-semibold">
                        ${orderData.pricing.shipping.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <p className="text-gray-700 font-bold">Total:</p>
                      <p className="text-gray-900 font-bold text-2xl">
                        ${orderData.pricing.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Information Section */}
            <section className="mb-10 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p>
                    <strong>Name:</strong> {orderData.customer.name}
                  </p>
                  <p className="mt-2">
                    <strong>Address:</strong> {orderData.customer.address}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Email:</strong> {orderData.customer.email}
                  </p>
                  <p className="mt-2">
                    <strong>Phone:</strong> {orderData.customer.phone}
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery Information */}
            <section className="mb-10 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Delivery Information
              </h2>
              <p className="text-gray-700">
                Your order is being processed and is estimated to be delivered by{" "}
                <span className="font-bold">{orderData.estimatedDelivery}</span>.
              </p>
              <p className="text-gray-700 mt-4">
                You will receive a confirmation email with tracking details once
                your package is on the way.
              </p>
            </section>

            {/* Additional Recommendations (Optional) */}
            <section className="mb-10 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Example recommended items - these could be fetched from an API */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="https://shopzetu.com/cdn/shop/files/QClgdireZV_360x.jpg?v=1741855708"
                    alt="Recommended Summer Outfit"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Breezy Summer Outfit
                    </h3>
                    <p className="text-gray-600">$69.99</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="https://shopzetu.com/cdn/shop/files/SQ9K3YlUn8_360x.jpg?v=1741779894"
                    alt="Recommended Heels"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Strappy High Heels
                    </h3>
                    <p className="text-gray-600">$49.99</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="https://shopzetu.com/cdn/shop/files/MmYgxFKFzv_1800x1800.jpg?v=1741937341"
                    alt="Recommended Fashion Bag"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Chic Handbag
                    </h3>
                    <p className="text-gray-600">$59.99</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Auto-Redirect Countdown */}
            <section className="mb-10 text-center">
              <p className="text-lg text-gray-600">
                You will be redirected to your order history in{" "}
                <span className="font-bold text-gray-900">{countdown}</span> seconds.
              </p>
              <Link
                to="/orders"
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Go to Order History Now
              </Link>
            </section>

            {/* Footer */}
            <footer className="mt-16 border-t pt-6">
              <p className="text-center text-gray-500 text-base">
                Women’s Fashion Store &copy; {new Date().getFullYear()} - All rights
                reserved.
              </p>
            </footer>
          </>
        )
      )}
    </div>
  );
};

export default UserOrderConfirmation;
