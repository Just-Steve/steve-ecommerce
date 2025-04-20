import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminManageItems from "./components/admin-view/admin/pages/AdminManageItemsDashboard";
import AdminAddProduct from './components/admin-view/admin/pages/AdminAddNewProduct';
import AdminEditProduct from './components/admin-view/admin/pages/AdminEditProduct';  
import AdminCustomers from "./components/admin-view/admin/pages/AdminCustomerManagement";
import AdminSalesReports from "./components/admin-view/admin/pages/AdminSalesReportsDashboard";
import AdminReturns from './components/admin-view/admin/pages/AdminReturnsManagementDashboard';
import AdminInventory from "./components/admin-view/admin/pages/AdminInventoryManagementDashboard";
import AdminShipping from "./components/admin-view/admin/pages/AdminShippingManagementDashboard";
import AdminPromotions from "./components/admin-view/admin/pages/AdminPromotionsManagementDashboard";
import AdminReviews from "./components/admin-view/admin/pages/AdminReviewsManagementDashboard";
import AdminVendors from "./components/admin-view/admin/pages/AdminVendorManagementDashboard";
import AdminUserRoles from "./components/admin-view/admin/pages/AdminUserRoleManagementDashboard";
import AdminAnalytics from './components/admin-view/admin/pages/AdminAdvancedAnalyticsDashboard';
import AdminContent from "./components/admin-view/admin/pages/AdminContentManagementDashboard";
import AdminNotifications from "./components/admin-view/admin/pages/AdminBigNotificationSystem";
import AdminSettings from "./components/admin-view/admin/pages/AdminSettings";
import AdminLogout from "./components/admin-view/admin/pages/AdminLogout";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import UserDashboardLayout from "./components/user/components/UserDashboardLayout";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-full bg-gray-200 h-[600px]" />;

  // If user is not authenticated and not on auth routes, redirect to login
  const currentPath = window.location.pathname;
  const isAuthRoute = currentPath.startsWith('/auth');
  
  if (!isAuthenticated && !isAuthRoute && !isLoading) {
    window.location.href = 'http://localhost:5173/auth/login';
    return null;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Root route redirects to login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/shop/home" replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />

        {/* Auth routes - publicly accessible */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminLayout />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="manage-items" element={<AdminManageItems />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="edit-product/:id" element={<AdminEditProduct />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="sales-reports" element={<AdminSalesReports />} />
          <Route path="returns" element={<AdminReturns />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="shipping" element={<AdminShipping />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="user-roles" element={<AdminUserRoles />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="logout" element={<AdminLogout />} />
        </Route>

        {/* Protected shopping routes */}
        <Route
          path="/shop"
          element={
            isAuthenticated ? (
              <ShoppingLayout />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        >
          <Route path="user-dashboard" element={<UserDashboardLayout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;