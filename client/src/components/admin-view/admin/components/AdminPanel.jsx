import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminAuthenticated } from "../../../redux/features/auth/authService";
import Sidebar from "./Sidebar";
import {
  AdminDashboardWomenClothDashboard,
  AdminManageItemsDashboard,
  AdminAllOrdersDashboard,
  AdminAddNewProduct,
  AdminEditProduct,
  AdminCustomerManagement,
  AdminSalesReportsDashboard,
  AdminReturnsManagementDashboard,
  AdminInventoryManagementDashboard,
  AdminShippingManagementDashboard,
  AdminPromotionsManagementDashboard,
  AdminReviewsManagementDashboard,
  AdminVendorManagementDashboard,
  AdminUserRoleManagementDashboard,
  AdminAdvancedAnalyticsDashboard,
  AdminSettings,
  AdminLogout,
  AdminContentManagementDashboard,
  AdminBigNotificationSystem,
  AdminLogin,
} from "../index";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("AdminDashboardWomenClothDashboard");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Render the active component based on the sidebar selection
  const renderComponent = () => {
    switch (activeComponent) {
      case "AdminDashboardWomenClothDashboard":
        return <AdminDashboardWomenClothDashboard />;
      case "AdminManageItemsDashboard":
        return <AdminManageItemsDashboard />;
      case "AdminAllOrdersDashboard":
        return <AdminAllOrdersDashboard />;
      case "AdminAddNewProduct":
        return <AdminAddNewProduct />;
      case "AdminEditProduct":
        return <AdminEditProduct />;
      case "AdminCustomerManagement":
        return <AdminCustomerManagement />;
      case "AdminSalesReportsDashboard":
        return <AdminSalesReportsDashboard />;
      case "AdminReturnsManagementDashboard":
        return <AdminReturnsManagementDashboard />;
      case "AdminInventoryManagementDashboard":
        return <AdminInventoryManagementDashboard />;
      case "AdminShippingManagementDashboard":
        return <AdminShippingManagementDashboard />;
      case "AdminPromotionsManagementDashboard":
        return <AdminPromotionsManagementDashboard />;
      case "AdminReviewsManagementDashboard":
        return <AdminReviewsManagementDashboard />;
      case "AdminVendorManagementDashboard":
        return <AdminVendorManagementDashboard />;
      case "AdminUserRoleManagementDashboard":
        return <AdminUserRoleManagementDashboard />;
      case "AdminAdvancedAnalyticsDashboard":
        return <AdminAdvancedAnalyticsDashboard />;
      case "AdminContentManagementDashboard":
        return <AdminContentManagementDashboard />;
      case "AdminBigNotificationSystem":
        return <AdminBigNotificationSystem />;
      case "AdminSettings":
        return <AdminSettings />;
      case "AdminLogout":
        return <AdminLogout />;
      default:
        return <AdminDashboardWomenClothDashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <div className="flex-1 p-5">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPanel;
