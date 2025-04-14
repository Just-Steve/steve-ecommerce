import React from "react";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const menuItems = [
    { label: "Dashboard", component: "AdminDashboardWomenClothDashboard" },
    { label: "Manage Items", component: "AdminManageItemsDashboard" },
    { label: "All Orders", component: "AdminAllOrdersDashboard" },
    { label: "Add New Product", component: "AdminAddNewProduct" },
    { label: "Edit Product", component: "AdminEditProduct" },
    { label: "Customer Management", component: "AdminCustomerManagement" },
    { label: "Sales Reports", component: "AdminSalesReportsDashboard" },
    { label: "Returns Management", component: "AdminReturnsManagementDashboard" },
    { label: "Inventory", component: "AdminInventoryManagementDashboard" },
    { label: "Shipping", component: "AdminShippingManagementDashboard" },
    { label: "Promotions", component: "AdminPromotionsManagementDashboard" },
    { label: "Reviews", component: "AdminReviewsManagementDashboard" },
    { label: "Vendor Management", component: "AdminVendorManagementDashboard" },
    { label: "User Roles", component: "AdminUserRoleManagementDashboard" },
    { label: "Analytics", component: "AdminAdvancedAnalyticsDashboard" },
    { label: "Content Management", component: "AdminContentManagementDashboard" },
    { label: "Notifications", component: "AdminBigNotificationSystem" },
    { label: "Settings", component: "AdminSettings" },
    { label: "Logout", component: "AdminLogout" },
  ];

  return (
    <aside
      className="
        w-64 
        h-screen          /* Full viewport height */
        bg-gray-900 
        text-white 
        p-5 
        overflow-y-auto   /* Enable vertical scrolling if menu is too long */
      "
    >
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.component}
              onClick={() => setActiveComponent(item.component)}
              className={`
                cursor-pointer 
                p-3 
                rounded-md 
                mb-2 
                transition-colors 
                duration-200 
                ease-in-out 
                ${
                  activeComponent === item.component
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }
              `}
              aria-current={activeComponent === item.component ? "page" : undefined}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
