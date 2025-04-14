import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Dummy cart summary data (In a real app, this would come from your cart state)
const dummyOrderSummary = {
  subtotal: 249.95,
  shipping: 15.0,
  total: 264.95,
};

// Dummy payment methods for demonstration purposes
const paymentMethods = [
  { id: 1, name: "Credit Card" },
  { id: 2, name: "PayPal" },
  { id: 3, name: "Debit Card" },
];

const UserCheckout = () => {
  const navigate = useNavigate();

  // Shipping information state
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Payment information state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].name);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Order state and feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Simulate fetching order summary data on mount
  const [orderSummary, setOrderSummary] = useState(dummyOrderSummary);
  useEffect(() => {
    // In a real application, fetch order summary from the cart or API
    setOrderSummary(dummyOrderSummary);
  }, []);

  // Validate the shipping and payment forms
  const validateForm = () => {
    if (!fullName || !address || !city || !postalCode || !country) {
      return "Please fill in all shipping details.";
    }
    if (selectedPaymentMethod === "Credit Card" || selectedPaymentMethod === "Debit Card") {
      if (!cardNumber || !expiryDate || !cvv) {
        return "Please fill in all credit/debit card details.";
      }
    }
    return "";
  };

  // Handler for placing the order (simulate API call)
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    // Simulate API delay and order placement
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      // Clear form fields if needed, or navigate to a success page
      // Navigate to Order Confirmation Page after a short delay
      setTimeout(() => {
        navigate("/order-confirmation");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">
          Please review your shipping information and payment details before placing your order.
        </p>
      </header>

      {/* Order Summary Section */}
      <section className="mb-10 bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Subtotal:</p>
            <p className="text-gray-900 font-semibold">${orderSummary.subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Shipping:</p>
            <p className="text-gray-900 font-semibold">${orderSummary.shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-gray-700 font-bold">Total:</p>
            <p className="text-gray-900 font-bold text-xl">${orderSummary.total.toFixed(2)}</p>
          </div>
        </div>
      </section>

      {/* Shipping Information Form */}
      <section className="mb-10 bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Details</h2>
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Payment Information Section */}
          <section className="mb-10 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select Payment Method:
              </label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.name}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            {(selectedPaymentMethod === "Credit Card" || selectedPaymentMethod === "Debit Card") && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="XXX"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
              {error}
            </div>
          )}

          {/* Place Order Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </section>

      {/* Order Confirmation (if order placed) */}
      {orderPlaced && (
        <div className="mb-10 p-6 bg-green-100 border border-green-300 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-700">Order Placed Successfully!</h2>
          <p className="text-green-600 mt-2">
            Thank you for your purchase. You will be redirected to the order confirmation page shortly.
          </p>
        </div>
      )}

      

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Checkout &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserCheckout;
