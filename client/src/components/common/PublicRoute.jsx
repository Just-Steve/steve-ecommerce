import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, user }) => {
  // If already logged in, redirect based on the user's role.
  if (isAuthenticated && user?.role) {
    return user.role === "admin" 
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }
  // Otherwise, render the public content.
  return <Outlet />;
};

export default PublicRoute;
