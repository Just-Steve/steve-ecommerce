import { Navigate, Outlet } from "react-router-dom";

const ShopRoute = ({ isAuthenticated, user }) => {
  // If not authenticated or role not set, redirect to login.
  if (!isAuthenticated || !user?.role) {
    return <Navigate to="/auth/login" replace />;
  }
  // If an admin tries to access shop routes, redirect them to admin dashboard.
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  // Otherwise, render the shop routes.
  return <Outlet />;
};

export default ShopRoute;
