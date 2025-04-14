


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const UserLogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear user data from localStorage or state
//     localStorage.removeItem("userToken");

//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
//     >
//       Logout
//     </button>
//   );
// };

// export default UserLogoutButton;


import { useNavigate } from "react-router-dom";

const UserLogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage or state
    localStorage.removeItem("userToken");

    // Redirect to home page
    navigate("/");    
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default UserLogoutButton;
