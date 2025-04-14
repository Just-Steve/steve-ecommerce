import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboardWomenClothDashboard from "./admin/components/AdminDashboardWomenClothDashboard";
import AdminManageItemsDashboard from "./admin/components/AdminManageItemsDashboard";
import AdminAllOrdersDashboard from "./admin/components/AdminAllOrdersDashboard";
import AdminAddNewProduct from "./admin/components/AdminAddNewProduct";
import AdminEditProduct from "./admin/components/AdminEditProduct";
import AdminCustomerManagement from "./admin/components/AdminCustomerManagement";
import AdminSalesReportsDashboard from "./admin/components/AdminSalesReportsDashboard";
import AdminReturnsManagementDashboard from "./admin/components/AdminReturnsManagementDashboard";
import AdminInventoryManagementDashboard from "./admin/components/AdminInventoryManagementDashboard";
import AdminShippingManagementDashboard from "./admin/components/AdminShippingManagementDashboard";
import AdminPromotionsManagementDashboard from "./admin/components/AdminPromotionsManagementDashboard";
import AdminReviewsManagementDashboard from "./admin/components/AdminReviewsManagementDashboard";
import AdminVendorManagementDashboard from "./admin/components/AdminVendorManagementDashboard";
import AdminUserRoleManagementDashboard from "./admin/components/AdminUserRoleManagementDashboard";
import AdminAdvancedAnalyticsDashboard from "./admin/components/AdminAdvancedAnalyticsDashboard";
import AdminContentManagementDashboard from "./admin/components/AdminContentManagementDashboard";
import AdminBigNotificationSystem from "./admin/components/AdminBigNotificationSystem";
import Sidebar from "./admin/components/Sidebar";
import AdminSettings from "./pages/AdminSettings";
import EditProductPage from "./admin/components/EditProductPage";
import { AdminLogout } from "./pages/AdminLogout";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full p-6">
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboardWomenClothDashboard />} />
            <Route path="/admin/manage-products" element={<AdminManageItemsDashboard />} />
            <Route path="/admin/manage-orders" element={<AdminAllOrdersDashboard />} />
            <Route path="/admin/add-new-product" element={<AdminAddNewProduct />} />
            <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
            <Route path="/admin/customers" element={<AdminCustomerManagement />} />
            <Route path="/admin/sales-reports" element={<AdminSalesReportsDashboard />} />
            <Route path="/admin/returns" element={<AdminReturnsManagementDashboard />} />
            <Route path="/admin/inventory" element={<AdminInventoryManagementDashboard />} />
            <Route path="/admin/shipping" element={<AdminShippingManagementDashboard />} />
            <Route path="/admin/promotions" element={<AdminPromotionsManagementDashboard />} />
            <Route path="/admin/reviews" element={<AdminReviewsManagementDashboard />} />
            <Route path="/admin/vendors" element={<AdminVendorManagementDashboard />} />
            <Route path="/admin/user-role-management" element={<AdminUserRoleManagementDashboard />} />
            <Route path="/admin/analytics" element={<AdminAdvancedAnalyticsDashboard />} />
            <Route path="/admin/content-management" element={<AdminContentManagementDashboard />} />
            <Route path="/admin/notifications" element={<AdminBigNotificationSystem />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="/dashboard/admin" element={<AdminDashboardWomenClothDashboard />} />
            <Route path="/dashboard/edit-product/:id" element={<EditProductPage />} />
            <Route path="/admin/logout" element={<AdminLogout/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
