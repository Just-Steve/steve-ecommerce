import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy data for demonstration purposes
const dummyProducts = [
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 7,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 8,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 9,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 10,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 11,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 12,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 7,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 8,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 9,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 10,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 11,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 12,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 7,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 8,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 9,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 10,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 11,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 12,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 7,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 8,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 9,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 10,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 11,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 12,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 7,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 8,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 9,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 10,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 11,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 12,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  {
    id: 7,
    name: "Elegant Red Dress",
    category: "Dresses",
    price: 79.99,
    stock: 10,
    imageUrl: "https://shopzetu.com/cdn/shop/files/17509_360x.jpg?v=1739274133",
  },
  {
    id: 8,
    name: "Casual Blue Top",
    category: "Tops",
    price: 39.99,
    stock: 15,
    imageUrl: "https://shopzetu.com/cdn/shop/files/3459_eee2d10c-f895-4ce1-8e82-920298a80eb0_360x.jpg?v=1741965857",
  },
  {
    id: 9,
    name: "Stylish Black Skirt",
    category: "Skirts",
    price: 49.99,
    stock: 8,
    imageUrl: "https://shopzetu.com/cdn/shop/products/ZETU5845-584219_360x.jpg?v=1707909061",
  },
  {
    id: 10,
    name: "Comfortable White Blouse",
    category: "Tops",
    price: 44.99,
    stock: 20,
    imageUrl: "https://shopzetu.com/cdn/shop/files/aF2sM0Zpmt-368885_360x.jpg?v=1723122798",
  },
  {
    id: 11,
    name: "Flowy Floral Dress",
    category: "Dresses",
    price: 89.99,
    stock: 5,
    imageUrl: "https://shopzetu.com/cdn/shop/files/MGL0489_46b7d95d-fb67-4cef-872d-a8be3071e6dd-677285_360x.jpg?v=1725358222",
  },
  {
    id: 12,
    name: "Elegant Black Heels",
    category: "Shoes",
    price: 99.99,
    stock: 12,
    imageUrl: "https://shopzetu.com/cdn/shop/files/E6ZMD6rCBE-200229_360x.jpg?v=1725357421",
  },
  // Add more items as needed
];

const AdminManageItemsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProducts(dummyProducts);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" ? true : product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle category filter
  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  // Delete product modal controls
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  const handleDeleteProduct = () => {
    // In a real scenario, call API to delete product then update state.
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    closeDeleteModal();
  };

  // Render product table row
  const renderTableRow = (product) => (
    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-4">
        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
      </td>
      <td className="p-4 font-medium text-gray-800">{product.name}</td>
      <td className="p-4 text-gray-600">{product.category}</td>
      <td className="p-4 text-gray-600">${product.price.toFixed(2)}</td>
      <td className="p-4 text-gray-600">{product.stock}</td>
      <td className="p-4">
        <Link to={`#`} className="text-blue-600 hover:underline mr-3">
          Edit
        </Link>
        <button onClick={() => openDeleteModal(product)} className="text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">Manage Products</h1>
        <div>
          <Link
            to="#"
            className="px-6 py-3 bg-green-600 text-white rounded-full text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Add New Product
          </Link>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="search" className="block text-lg text-gray-700 mb-2">
            Search Products:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Enter product name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-lg text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            id="category"
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
        <div className="flex items-end">
          <button
            onClick={fetchProducts}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Refresh Data
          </button>
        </div>
      </section>

      {/* Loading, Error, and Table Section */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.map((product) => renderTableRow(product))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center space-x-2">
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete <strong>{selectedProduct.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteProduct} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-black text-lg text-base mt-4 mb-2">
          Manage Items Dashboard &copy; {new Date().getFullYear()} - Admin Panel.
        </p>
      </footer>

      {/* Extra Content for Verbosity */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h3>
        <p className="text-gray-600 mb-3">
          This section can include extra metrics, reports, or settings that allow for more granular control over the product catalog.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Inventory Overview</h4>
            <p className="text-gray-600">
              View overall product stock levels, reorder thresholds, and low inventory alerts. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Sales Metrics</h4>
            <p className="text-gray-600">
              Monitor daily, weekly, and monthly sales data along with top-selling products. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      
      </section>
    </div>
  );
};

export default AdminManageItemsDashboard;
