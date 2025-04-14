import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy cart data for demonstration purposes
const dummyCartItems = [
  {
    id: 1,
    name: "Elegant Red Dress",
    imageUrl: "https://shopzetu.com/cdn/shop/files/1945_360x.jpg?v=1741213261",
    price: 79.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Casual Blue Top",
    imageUrl: "https://shopzetu.com/cdn/shop/files/26508_f62c6720-ab8c-42f2-bb0a-2643a67538bf_360x.jpg?v=1741213270",
    price: 39.99,
    quantity: 2,
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    imageUrl: "https://shopzetu.com/cdn/shop/files/26137_cb4a04dc-dc42-4b44-a077-43089ff1de04_360x.jpg?v=1741213426",
    price: 49.99,
    quantity: 1,
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    imageUrl: "https://shopzetu.com/cdn/shop/files/25440_d1f00c9d-7bb1-4c36-bd0d-6998a41eb797_360x.jpg?v=1741213427",
    price: 44.99,
    quantity: 3,
  },
];

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items (simulate API call)
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
      setCartItems(dummyCartItems);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch cart items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Handle quantity update
  const updateQuantity = (id, newQuantity) => {
    setUpdating(true);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    setTimeout(() => setUpdating(false), 500); // simulate update delay
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 15.0 : 0; // Flat shipping rate
  const total = (subtotal + shipping).toFixed(2);

  // Handler for checkout (simulate navigation)
  const handleCheckout = () => {
    // In a real app, you might integrate payment gateway and order creation here.
    navigate("/checkout");
  };

  // Render a single cart item card
  const renderCartItem = (item) => (
    <div key={item.id} className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="w-full md:w-1/4">
        <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
      </div>
      <div className="w-full md:w-3/4 mt-4 md:mt-0 md:pl-6">
        <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-2">Price: <span className="text-green-600 font-semibold">${item.price.toFixed(2)}</span></p>
        <div className="mt-4 flex items-center">
          <label className="mr-3 text-gray-700">Quantity:</label>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            className="w-16 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700 font-semibold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">
          Review your selected items, update quantities, and proceed to checkout.
        </p>
      </header>

      {/* Loading & Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading cart items...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <section className="mb-10">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                <p>Your cart is currently empty.</p>
                <Link to="/shop" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => renderCartItem(item))
            )}
          </section>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <section className="bg-white rounded-lg shadow-xl p-8 mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Subtotal:</p>
                  <p className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Shipping:</p>
                  <p className="text-gray-900 font-semibold">${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <p className="text-gray-700 font-bold">Total:</p>
                  <p className="text-gray-900 font-bold text-xl">${total}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCheckout}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={updating}
                >
                  {updating ? "Updating Cart..." : "Proceed to Checkout"}
                </button>
              </div>
            </section>
          )}

      
        </>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Cart &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserCart;
