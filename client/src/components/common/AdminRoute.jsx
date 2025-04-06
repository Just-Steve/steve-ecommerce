import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ isAuthenticated, user }) => {
  // If not authenticated or missing role information, send to login.
  if (!isAuthenticated || !user?.role) {
    return <Navigate to="/auth/login" replace />;
  }
  // If authenticated but not an admin, redirect to unauthorized page.
  if (user.role !== "admin") {
    return <Navigate to="/unauth-page" replace />;
  }
  // Otherwise, render the admin routes.
  return <Outlet />;
};

export default AdminRoute;
