import React, { useState, useEffect } from "react";

const dummyWishlist = [
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    imageUrl: "https://shopzetu.com/cdn/shop/files/Adt8DA0wXY-327769_1800x1800.jpg?v=1733830592",
    price: 79.99,
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    imageUrl: "https://shopzetu.com/cdn/shop/files/lfVdQSKiAh_360x.jpg?v=1742906676",
    price: 39.99,
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    imageUrl: "https://shopzetu.com/cdn/shop/files/N2FrwDfkkc_360x.jpg?v=1742297833",
    price: 49.99,
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    imageUrl: "https://shopzetu.com/cdn/shop/files/r3kCOlAaew_360x.jpg?v=1742296647                                          ",
    price: 44.99,
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    imageUrl: "https://shopzetu.com/cdn/shop/files/Whx5jqeaD2_360x.jpg?v=1741934044",
    price: 89.99,
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    imageUrl: "https://shopzetu.com/cdn/shop/files/3ngk6Zi62i_360x.jpg?v=1741937341",
    price: 99.99,
  },];

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // For modal detail view

  const itemsPerPage = 3;

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setWishlist(dummyWishlist);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch wishlist items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  const filteredWishlist = wishlist.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" ? true : item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredWishlist.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render a card for each wishlist item
  const renderWishlistCard = (item) => (
    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={item.imageUrl} alt={item.name} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-2">Category: {item.category}</p>
        <p className="text-green-600 font-semibold text-xl mt-2">${item.price.toFixed(2)}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setSelectedItem(item)}
            className="text-blue-600 hover:underline"
          >
            View Details
          </button>
          <button
            onClick={() => handleRemove(item.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Component with Full Image Link
  const Modal = ({ item, onClose }) => {
    if (!item) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
          <div className="relative">
            <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
            >
              X
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">Category: {item.category}</p>
            <p className="text-green-600 font-semibold text-xl mb-4">${item.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">
              Here you can add more detailed information about the product. It can be a description, features, reviews, etc.
            </p>
            <a
              href={item.imageUrl}
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
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Your Wishlist</h1>
        <p className="text-gray-600 mt-2">
          Here you can view and manage the items you've added to your wishlist.
        </p>
      </header>

      {/* Search, Filter Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="wishlist-search" className="block text-lg text-gray-700 mb-2">
            Search Items:
          </label>
          <input
            id="wishlist-search"
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="wishlist-category" className="block text-lg text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            id="wishlist-category"
            value={filterCategory}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Dresses">Dresses</option>
            <option value="Tops">Tops</option>
            <option value="Skirts">Skirts</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading wishlist...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Wishlist Items Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                No items found in your wishlist.
              </div>
            ) : (
              currentItems.map((item) => renderWishlistCard(item))
            )}
          </section>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Modal for detailed view */}
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Wishlist &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserWishlist;
