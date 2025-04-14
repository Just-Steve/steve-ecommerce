import React, { useState, useEffect } from "react";

// Dummy inventory data for demonstration purposes
const dummyInventoryData = [
  {
    id: 1,
    name: "Elegant Red Dress",
    category: "Dresses",
    stock: 15,
    reorderLevel: 10,
    lastRestock: "2023-03-10",
    supplier: "Fashion Hub Co.",
  },
  {
    id: 2,
    name: "Casual Blue Top",
    category: "Tops",
    stock: 8,
    reorderLevel: 12,
    lastRestock: "2023-03-12",
    supplier: "Trendsetters Inc.",
  },
  {
    id: 3,
    name: "Stylish Black Skirt",
    category: "Skirts",
    stock: 20,
    reorderLevel: 15,
    lastRestock: "2023-03-08",
    supplier: "Chic Apparel",
  },
  {
    id: 4,
    name: "Comfortable White Blouse",
    category: "Tops",
    stock: 5,
    reorderLevel: 8,
    lastRestock: "2023-03-14",
    supplier: "Urban Style",
  },
  {
    id: 5,
    name: "Flowy Floral Dress",
    category: "Dresses",
    stock: 12,
    reorderLevel: 10,
    lastRestock: "2023-03-11",
    supplier: "Elegant Attire",
  },
  {
    id: 6,
    name: "Elegant Black Heels",
    category: "Shoes",
    stock: 7,
    reorderLevel: 5,
    lastRestock: "2023-03-09",
    supplier: "Footwear World",
  },
  // Additional dummy products can be added here
];

const AdminInventoryManagementDashboard = () => {
  // State for inventory data, filters, search, pagination, and modal
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortField, setSortField] = useState("stock");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulated API call to fetch inventory data
  const fetchInventory = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
      setInventory(dummyInventoryData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch inventory data.");
      setLoading(false);
    }
  };

  // Load inventory data when the component mounts
  useEffect(() => {
    fetchInventory();
  }, []);

  // Handler for search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handler for category filter changes
  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  // Handler for sort field changes
  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  // Handler for sort order changes
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter inventory based on search and category
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" ? true : item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort inventory based on selected field and order
  const sortedInventory = filteredInventory.sort((a, b) => {
    if (sortField === "stock") {
      return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
    } else if (sortField === "lastRestock") {
      return sortOrder === "asc"
        ? new Date(a.lastRestock) - new Date(b.lastRestock)
        : new Date(b.lastRestock) - new Date(a.lastRestock);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedInventory.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing inventory details
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  // Render each table row for an inventory item
  const renderTableRow = (item) => (
    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{item.id}</td>
      <td className="p-4 text-gray-700">{item.name}</td>
      <td className="p-4 text-gray-700">{item.category}</td>
      <td className="p-4 text-gray-700">{item.stock}</td>
      <td className="p-4 text-gray-700">{item.reorderLevel}</td>
      <td className="p-4 text-gray-700">{item.lastRestock}</td>
      <td className="p-4 text-gray-700">{item.supplier}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(item)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Inventory Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage product inventory. Use the filters below to refine your view.
        </p>
      </header>

      {/* Search, Filter & Sort Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="inventory-search" className="block text-lg text-gray-700 mb-2">
            Search by Product Name:
          </label>
          <input
            id="inventory-search"
            type="text"
            placeholder="Enter product name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category-filter" className="block text-lg text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            id="category-filter"
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
        <div>
          <label htmlFor="sort-field" className="block text-lg text-gray-700 mb-2">
            Sort Field:
          </label>
          <select
            id="sort-field"
            value={sortField}
            onChange={handleSortFieldChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="stock">Stock</option>
            <option value="lastRestock">Last Restock</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort-order" className="block text-lg text-gray-700 mb-2">
            Sort Order:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading inventory data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Inventory Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reorder Level</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Last Restock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Supplier</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-gray-600">
                      No inventory records found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => renderTableRow(item))
                )}
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

      {/* Inventory Details Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Inventory Details (ID: {selectedItem.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Name:</strong> {selectedItem.name}</p>
              <p className="text-gray-700"><strong>Category:</strong> {selectedItem.category}</p>
              <p className="text-gray-700"><strong>Stock:</strong> {selectedItem.stock}</p>
              <p className="text-gray-700"><strong>Reorder Level:</strong> {selectedItem.reorderLevel}</p>
              <p className="text-gray-700"><strong>Last Restock:</strong> {selectedItem.lastRestock}</p>
              <p className="text-gray-700"><strong>Supplier:</strong> {selectedItem.supplier}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          Admin Inventory Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes and Additional Insights */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
        <p className="text-gray-600 mb-3">
          Monitor trends in inventory levels, track items reaching reorder thresholds, and manage supplier performance. This section provides extra context and guidance for inventory optimization.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Stock Level Trends</h4>
            <p className="text-gray-600">
              Visualize how stock levels change over time. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ipsum ac nisl interdum condimentum.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Supplier Performance</h4>
            <p className="text-gray-600">
              Evaluate supplier delivery times and consistency. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at lorem non nisl pretium maximus.
            </p>
          </div>
        </div>
      
      </section>
    </div>
  );
};

export default AdminInventoryManagementDashboard;


// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const AdminInventoryManagementDashboard = () => {
//   const [inventory, setInventory] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [sortField, setSortField] = useState("stock");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fetchInventory = async () => {
//     try {
//       setLoading(true);
//       const querySnapshot = await getDocs(collection(db, "inventory"));
//       const inventoryData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setInventory(inventoryData);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch inventory data.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleCategoryChange = (e) => {
//     setFilterCategory(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleSortFieldChange = (e) => {
//     setSortField(e.target.value);
//   };

//   const handleSortOrderChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   const filteredInventory = inventory.filter((item) => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = filterCategory === "All" ? true : item.category === filterCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const sortedInventory = filteredInventory.sort((a, b) => {
//     if (sortField === "stock") {
//       return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
//     } else if (sortField === "lastRestock") {
//       return sortOrder === "asc"
//         ? new Date(a.lastRestock) - new Date(b.lastRestock)
//         : new Date(b.lastRestock) - new Date(a.lastRestock);
//     }
//     return 0;
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = sortedInventory.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(sortedInventory.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedItem(null);
//     setShowModal(false);
//   };

//   const renderTableRow = (item) => (
//     <tr key={item.id} className="hover:bg-gray-50 transition-colors">
//       <td className="p-4 text-gray-700">{item.id}</td>
//       <td className="p-4 text-gray-700">{item.name}</td>
//       <td className="p-4 text-gray-700">{item.category}</td>
//       <td className="p-4 text-gray-700">{item.stock}</td>
//       <td className="p-4 text-gray-700">{item.reorderLevel}</td>
//       <td className="p-4 text-gray-700">{item.lastRestock}</td>
//       <td className="p-4 text-gray-700">{item.supplier}</td>
//       <td className="p-4">
//         <button
//           onClick={() => openModal(item)}
//           className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//         >
//           View
//         </button>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="p-10 bg-gray-50 min-h-screen">
//       <header className="mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-900">Inventory Management Dashboard</h1>
//         <p className="text-gray-600 mt-2">
//           Monitor and manage product inventory. Use the filters below to refine your view.
//         </p>
//       </header>
//       <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-2">
//           <label htmlFor="inventory-search" className="block text-lg text-gray-700 mb-2">
//             Search by Product Name:
//           </label>
//           <input
//             id="inventory-search"
//             type="text"
//             placeholder="Enter product name..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="category-filter" className="block text-lg text-gray-700 mb-2">
//             Filter by Category:
//           </label>
//           <select
//             id="category-filter"
//             value={filterCategory}
//             onChange={handleCategoryChange}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="All">All</option>
//             <option value="Dresses">Dresses</option>
//             <option value="Tops">Tops</option>
//             <option value="Skirts">Skirts</option>
//             <option value="Shoes">Shoes</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="sort-field" className="block text-lg text-gray-700 mb-2">
//             Sort Field:
//           </label>
//           <select
//             id="sort-field"
//             value={sortField}
//             onChange={handleSortFieldChange}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="stock">Stock</option>
//             <option value="lastRestock">Last Restock</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="sort-order" className="block text-lg text-gray-700 mb-2">
//             Sort Order:
//           </label>
//           <select
//             id="sort-order"
//             value={sortOrder}
//             onChange={handleSortOrderChange}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </div>
//       </section>
//       {loading ? (
//         <div className="py-12 text-center">
//           <p className="text-2xl text-gray-600">Loading inventory data...</p>
//         </div>
//       ) : error ? (
//         <div className="py-12 text-center text-red-500">
//           <p className="text-xl">{error}</p>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reorder Level</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Last Restock</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Supplier</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {currentItems.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="p-6 text-center text-gray-600">
//                       No inventory records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   currentItems.map((item) => renderTableRow(item))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-6 flex justify-center items-center space-x-2">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => paginate(index + 1)}
//                 className={`px-4 py-2 rounded-md transition-colors ${
//                   currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//       {showModal && selectedItem && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Inventory Details (ID: {selectedItem.id})
//             </h2>
//             <div className="mb-4">
//               <p className="text-gray-700">
//                 <strong>Name:</strong> {selectedItem.name}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Category:</strong> {selectedItem.category}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Stock:</strong> {selectedItem.stock}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Reorder Level:</strong> {selectedItem.reorderLevel}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Last Restock:</strong> {selectedItem.lastRestock}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Supplier:</strong> {selectedItem.supplier}
//               </p>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <footer className="mt-16 border-t pt-6">
//         <p className="text-center text-gray-500 text-base">
//           Admin Inventory Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
//         </p>
//       </footer>
//       <section className="mt-10">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Insights</h3>
//         <p className="text-gray-600 mb-3">
//           Monitor trends in inventory levels, track items reaching reorder thresholds, and manage supplier performance. This section provides extra context and guidance for inventory optimization.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
//             <h4 className="text-xl font-semibold text-gray-700 mb-2">Stock Level Trends</h4>
//             <p className="text-gray-600">
//               Visualize how stock levels change over time. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ipsum ac nisl interdum condimentum.
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
//             <h4 className="text-xl font-semibold text-gray-700 mb-2">Supplier Performance</h4>
//             <p className="text-gray-600">
//               Evaluate supplier delivery times and consistency. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at lorem non nisl pretium maximus.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AdminInventoryManagementDashboard;
