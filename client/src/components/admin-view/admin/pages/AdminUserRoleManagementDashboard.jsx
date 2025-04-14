import React, { useState, useEffect } from "react";

// Dummy data for users and their roles/permissions
const dummyUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    permissions: ["Manage Products", "View Orders", "Manage Users"],
    registered: "2025-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Manager",
    permissions: ["Manage Products", "View Orders"],
    registered: "2025-02-10",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    role: "Staff",
    permissions: ["View Orders"],
    registered: "2025-03-05",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    role: "Manager",
    permissions: ["Manage Products", "Manage Users"],
    registered: "2022-12-20",
  },
  {
    id: 5,
    name: "Eva Green",
    email: "eva@example.com",
    role: "Admin",
    permissions: ["Manage Products", "View Orders", "Manage Users", "Manage Promotions"],
    registered: "2025-01-25",
  },
  // Additional users can be added here
];

const AdminUserRoleManagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Simulate API call to fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUsers(dummyUsers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" ? true : user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal controls for viewing detailed user role/permissions
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const renderTableRow = (user) => (
    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{user.id}</td>
      <td className="p-4 text-gray-700">{user.name}</td>
      <td className="p-4 text-gray-700">{user.email}</td>
      <td className="p-4 text-gray-700">{user.role}</td>
      <td className="p-4 text-gray-700">{user.registered}</td>
      <td className="p-4">
        <button
          onClick={() => openModal(user)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Roles
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">User Role Management Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage user roles and permissions across the admin panel. Search and filter users to view detailed role assignments.
        </p>
      </header>

      {/* Search and Filter */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="user-search" className="block text-lg text-gray-700 mb-2">
            Search by Name:
          </label>
          <input
            id="user-search"
            type="text"
            placeholder="e.g., Alice"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="user-role" className="block text-lg text-gray-700 mb-2">
            Filter by Role:
          </label>
          <select
            id="user-role"
            value={filterRole}
            onChange={handleRoleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
      </section>

      {/* Loading / Error / Table */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading users...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Registered</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-600">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => renderTableRow(user))
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

      {/* Modal for Detailed Role/Permissions */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              User Details (ID: {selectedUser.id})
            </h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Name:</strong> {selectedUser.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {selectedUser.email}</p>
              <p className="text-gray-700"><strong>Role:</strong> {selectedUser.role}</p>
              <p className="text-gray-700"><strong>Registered:</strong> {selectedUser.registered}</p>
              <p className="text-gray-700"><strong>Permissions:</strong></p>
              <ul className="list-disc pl-6 text-gray-700">
                {selectedUser.permissions.map((perm, idx) => (
                  <li key={idx}>{perm}</li>
                ))}
              </ul>
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
          Admin User Role Management Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

      {/* Extra Verbose Developer Notes */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Developer Notes & Insights</h3>
        <p className="text-gray-600 mb-3">
          This dashboard allows administrators to manage user roles and view detailed permissions. Future improvements might include inline editing, role assignment automation, and integration with external identity providers.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
          <p className="text-gray-600">
            The above component simulates a complete role management system with pagination, modals, and detailed views. It is designed to be extended with real-time updates and API integrations in production.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminUserRoleManagementDashboard;
