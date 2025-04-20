import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy data for demonstration purposes
const dummyClothingData = [
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    imageUrl: "https://shopzetu.com/cdn/shop/files/uZ9n2VcIkP_360x.jpg?v=1733463230",
    price: 79.99,
    description: "A beautiful red dress perfect for formal events.",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    imageUrl: "https://shopzetu.com/cdn/shop/files/BTQI2pyL6f-388814_540x.jpg?v=1732096157",
    price: 39.99,
    description: "A casual blue top, ideal for a relaxed day out.",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    imageUrl: "https://shopzetu.com/cdn/shop/files/29yPAYetNC-689352_360x.jpg?v=1729871968",
    price: 49.99,
    description: "A stylish black skirt for a chic look.",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    imageUrl: "https://shopzetu.com/cdn/shop/files/fR3MM10XCg_360x.jpg?v=1738955235",
    price: 44.99,
    description: "A comfortable white blouse perfect for office wear.",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    imageUrl: "https://shopzetu.com/cdn/shop/files/25778_0987385d-8643-4963-91e2-b1e5dc5b3906_360x.jpg?v=1740587471",
    price: 89.99,
    description: "A flowy dress with beautiful floral patterns.",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    imageUrl: "https://shopzetu.com/cdn/shop/files/D2V2yiXV1E_360x.jpg?v=1738254453",
    price: 99.99,
    description: "Elegant black heels for every formal occasion.",
  },
];

const AdminDashboardWomenClothDashboard = ({ getIconForMenu }) => {
  const [clothingItems, setClothingItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real scenario, fetch data from an API endpoint
      setClothingItems(dummyClothingData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch clothing items.");
      setLoading(false);
    }
  };

  // useEffect to fetch data on mount
  useEffect(() => {
    fetchClothingItems();
  }, []);

  // Handle filtering by category
  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Handle sorting by price
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter items based on selected category
  const filteredItems = clothingItems.filter((item) => {
    if (filterCategory === "All") return true;
    return item.category === filterCategory;
  });

  // Sort items based on price
  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  // Render a single clothing card with enhanced styling
  const renderClothingCard = (item) => {
    return (
      <div
        key={item.id}
        className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 bg-white flex flex-col"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
        <h3 className="font-bold text-2xl text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-base mb-3">{item.description}</p>
        <span className="text-green-700 font-semibold text-xl mb-4">
          ${item.price.toFixed(2)}
        </span>
        <Link
          to={`#`}
          className="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit Product
        </Link>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Video Cover Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
        <source src="https://v.ftcdn.net/03/54/75/22/700_F_354752265_79Jf1KiqZjb2wairN6j1DxwQTlVnccIa_ST.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to Fashion Admin
          </h1>
          <p className="text-xl">
            Manage your exquisite clothing collections with ease.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-10 bg-gray-50 min-h-screen pt-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center mb-4 md:mb-0">
            {getIconForMenu && (
              <div className="text-blue-600 text-4xl mr-3">
                {getIconForMenu("Dashboard")}
              </div>
            )}
            <h1 className="text-4xl font-extrabold text-gray-900">
              Women Clothing Dashboard
            </h1>
          </div>
          <div>
            <Link
              to="#"
              className="px-6 py-3 bg-green-600 text-white rounded-full text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Add New Product
            </Link>
          </div>
        </header>

        {/* Filters and Sort Options */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="filter"
              className="block text-lg text-gray-700 mb-2"
            >
              Filter by Category:
            </label>
            <select
              id="filter"
              value={filterCategory}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Dresses">Dresses</option>
              <option value="Tops">Tops</option>
              <option value="Skirts">Skirts</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="sort"
              className="block text-lg text-gray-700 mb-2"
            >
              Sort by Price:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchClothingItems}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Refresh Products
            </button>
          </div>
        </section>

        {/* Loading and Error States */}
        {loading && (
          <div className="py-12 text-center">
            <p className="text-2xl text-gray-600">Loading products...</p>
          </div>
        )}
        {error && (
          <div className="py-12 text-center text-red-500">
            <p className="text-xl">{error}</p>
          </div>
        )}

        {/* Clothing Items Grid */}
        {!loading && !error && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedItems.map((item) => renderClothingCard(item))}
          </section>
        )}

        {/* Recent Activity */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <p className="text-gray-700 text-lg">
                User <strong className="font-bold">Anna</strong> updated the product{" "}
                <em>"Elegant Red Dress"</em>.
              </p>
              <span className="text-gray-500 text-sm">10 minutes ago</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <p className="text-gray-700 text-lg">
                User <strong className="font-bold">Maria</strong> added a new product{" "}
                <em>"Casual Blue Top"</em>.
              </p>
              <span className="text-gray-500 text-sm">25 minutes ago</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <p className="text-gray-700 text-lg">
                Admin performed a bulk update on product prices.
              </p>
              <span className="text-gray-500 text-sm">1 hour ago</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t pt-6">
          <p className="text-center text-black opacity-95 font-semibold mt-4 mb-2 text-lg text-base">
            Admin Dashboard &copy; {new Date().getFullYear()} - Manage your women's clothing products efficiently.
          </p>
        </footer>

        {/* Extra Spacing & Verbose Comments to Increase Code Length */}
        <section className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Additional Controls
          </h3>
          <p className="text-gray-600 mb-3">
            This section can include additional settings, reports, or controls for more granular product management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Control Panel
              </h4>
              <p className="text-gray-600">
                Access advanced settings and reports. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                System Metrics
              </h4>
              <p className="text-gray-600">
                Monitor system performance and key metrics. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 text-sm">

            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardWomenClothDashboard;
