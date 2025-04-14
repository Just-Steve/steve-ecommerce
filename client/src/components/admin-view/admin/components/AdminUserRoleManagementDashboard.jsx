import React, { useState, useEffect } from "react";
// import axios from "axios";

const AdminUserRoleManagementDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/api/admins").then((res) => {
      setAdmins(res.data);
    });
  }, []);


  const handleAddAdmin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/admins", { username, password, role })
      .then((res) => {
        setMessage(res.data.message);
        setUsername("");
        setPassword("");
        setRole("admin");
      })
      .catch((err) => {
        setMessage("Error adding admin.");
      });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Role Management</h2>
      
      {/* Add Admin Form */}
      <form onSubmit={handleAddAdmin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="main-admin">Main Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Add Admin
        </button>
      </form>

      {message && <p className="text-green-600 mt-2">{message}</p>}

      {/* Display Admins */}
      <h3 className="text-xl font-bold mt-6">Existing Admins</h3>
      <ul className="mt-2">
        {admins.map((admin) => (
          <li key={admin._id} className="p-2 border-b">
            {admin.username} ({admin.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserRoleManagementDashboard;
