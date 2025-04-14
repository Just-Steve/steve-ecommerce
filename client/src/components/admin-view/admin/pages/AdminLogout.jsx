import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear admin session token and any other related data
    localStorage.removeItem("adminToken");
    // Optionally clear additional session data (e.g., sessionStorage.removeItem('adminData'))

    // Navigate to the admin login page after a short delay
    setTimeout(() => {
      navigate("/admin-login");
    }, 500);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-bold">Logging out...</h2>
    </div>
  );
};

export default AdminLogout;
