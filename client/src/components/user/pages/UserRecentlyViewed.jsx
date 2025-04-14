import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy data simulating recently viewed products
const dummyRecentlyViewed = [
  {
    id: 101,
    name: "Elegant Red Dress",
    imageUrl: "https://shopzetu.com/cdn/shop/files/jUhBR5FRkQ_360x.jpg?v=1741846883",
    price: 79.99,
    category: "Dresses",
  },
  {
    id: 102,
    name: "Casual Blue Top",
    imageUrl: "https://shopzetu.com/cdn/shop/files/LXNt5LVjdO_540x.jpg?v=1741846587",
    price: 39.99,
    category: "Tops",
  },
  {
    id: 103,
    name: "Stylish Black Skirt",
    imageUrl: "https://shopzetu.com/cdn/shop/files/cIdtMMqP7f_360x.jpg?v=1741844764",
    price: 49.99,
    category: "Skirts",
  },
  {
    id: 104,
    name: "Comfortable White Blouse",
    imageUrl: "https://shopzetu.com/cdn/shop/files/1119_f725d271-4ce6-452d-a0f4-8d8e6ecf6b66_360x.jpg?v=1741864133",
    price: 44.99,
    category: "Tops",
  },
  {
    id: 105,
    name: "Flowy Floral Dress",
    imageUrl: "https://shopzetu.com/cdn/shop/files/lakkdC3Fsz_360x.jpg?v=1741758891",
    price: 89.99,
    category: "Dresses",
  },
  {
    id: 106,
    name: "Elegant Black Heels",
    imageUrl: "https://shopzetu.com/cdn/shop/files/mrp63num7f_360x.jpg?v=1741936702",
    price: 99.99,
    category: "Shoes",
  },
  {
    id: 107,
    name: "Modern Denim Jacket",
    imageUrl: "https://shopzetu.com/cdn/shop/files/pNQzW7H4yM_360x.jpg?v=1742905324",
    price: 59.99,
    category: "Jackets",
  },
  {
    id: 108,
    name: "Classic White Sneakers",
    imageUrl: "https://shopzetu.com/cdn/shop/files/wv5lSgsij9_360x.jpg?v=1742907825",
    price: 69.99,
    category: "Shoes",
  },
  // Add more dummy products as needed
];

const UserRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal detail view

  const itemsPerPage = 4;

  // Simulate fetching recently viewed products
  const fetchRecentlyViewed = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRecentlyViewed(dummyRecentlyViewed);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch recently viewed products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter products based on search term (matches product name or category)
  const filteredProducts = recentlyViewed.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesName || matchesCategory;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render a single product card
  const renderProductCard = (product) => (
    <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.category}</p>
        <p className="text-green-600 font-semibold text-xl mt-2">${product.price.toFixed(2)}</p>
        <button 
          onClick={() => setSelectedProduct(product)}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

  // Modal Component for product details with full image
  const Modal = ({ product, onClose }) => {
    if (!product) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
          <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
            >
              X
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">Category: {product.category}</p>
            <p className="text-green-600 font-semibold text-xl mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">
              Here you can add more detailed information about the product, including its description, features, and reviews.
            </p>
            <a
              href={product.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Full Image
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Recently Viewed</h1>
        <p className="text-xl text-gray-700 mt-4">
          Review the products you have viewed recently.
        </p>
      </header>

      {/* Search Bar */}
      <section className="mb-10 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-20 text-center">
          <p className="text-2xl text-gray-600">Loading recently viewed products...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <section className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No products match your search criteria.
              </p>
            ) : (
              currentItems.map((product) => renderProductCard(product))
            )}
          </section>

          {/* Pagination Controls */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center items-center space-x-3 mb-10">
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

      {/* Modal for detailed view */}
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Recently Viewed &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserRecentlyViewed;
