import React, { Fragment, useState } from "react";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Settings,
  ShoppingCart,
  Users,
  FileText,
  Package,
  Truck,
  Tag,
  Star,
  Briefcase,
  UserCog,
  BarChart,
  FileEdit,
  Bell,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Combined sidebar items with both routing and component state info
const sidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    component: "AdminDashboardWomenClothDashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Manage Items",
    path: "/admin/products",
    component: "AdminManageItemsDashboard",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "All Orders",
    path: "/admin/orders",
    component: "AdminAllOrdersDashboard",
    icon: <BadgeCheck />,
  },
  {
    id: "add-product",
    label: "Add New Product",
    path: "/admin/add-product",
    component: "AdminAddNewProduct",
    icon: <ShoppingBasket />,
  },
  {
    id: "customers",
    label: "Customer Management",
    path: "/admin/customers",
    component: "AdminCustomerManagement",
    icon: <Users />,
  },
  {
    id: "sales-reports",
    label: "Sales Reports",
    path: "/admin/sales-reports",
    component: "AdminSalesReportsDashboard",
    icon: <FileText />,
  },
  {
    id: "returns",
    label: "Returns Management",
    path: "/admin/returns",
    component: "AdminReturnsManagementDashboard",
    icon: <ShoppingCart />,
  },
  {
    id: "inventory",
    label: "Inventory",
    path: "/admin/inventory",
    component: "AdminInventoryManagementDashboard",
    icon: <Package />,
  },
  {
    id: "shipping",
    label: "Shipping",
    path: "/admin/shipping",
    component: "AdminShippingManagementDashboard",
    icon: <Truck />,
  },
  {
    id: "promotions",
    label: "Promotions",
    path: "/admin/promotions",
    component: "AdminPromotionsManagementDashboard",
    icon: <Tag />,
  },
  {
    id: "reviews",
    label: "Reviews",
    path: "/admin/reviews",
    component: "AdminReviewsManagementDashboard",
    icon: <Star />,
  },
  {
    id: "vendors",
    label: "Vendor Management",
    path: "/admin/vendors",
    component: "AdminVendorManagementDashboard",
    icon: <Briefcase />,
  },
  {
    id: "user-roles",
    label: "User Roles",
    path: "/admin/user-roles",
    component: "AdminUserRoleManagementDashboard",
    icon: <UserCog />,
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/admin/analytics",
    component: "AdminAdvancedAnalyticsDashboard",
    icon: <BarChart />,
  },
  {
    id: "content",
    label: "Content Management",
    path: "/admin/content",
    component: "AdminContentManagementDashboard",
    icon: <FileText />,
  },
  {
    id: "notifications",
    label: "Notifications",
    path: "/admin/notifications",
    component: "AdminBigNotificationSystem",
    icon: <Bell />,
  },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   path: "/admin/settings",
  //   component: "AdminSettings",
  //   icon: <Settings />,
  // },
];

function MenuItems({ setOpen, activeComponent, setActiveComponent, useStateBasedMenu }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-120px)]">
      {sidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            if (useStateBasedMenu) {
              setActiveComponent(menuItem.component);
            } else {
              navigate(menuItem.path);
            }
            setOpen?.(false);
          }}
          className={`flex cursor-pointer text-lg items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ease-in-out transform hover:scale-105 ${
            useStateBasedMenu
              ? activeComponent === menuItem.component
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              : location.pathname === menuItem.path
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {menuItem.icon}
          <span className="truncate">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

// Admin Sidebar Component
function AdminSideBar({
  open,
  setOpen,
  activeComponent,
  setActiveComponent,
  useStateBasedMenu = false,
  title = "Admin Panel",
}) {
  const navigate = useNavigate();

  // Force re-render for state change
  const [key] = useState(Math.random());

  return (
    <Fragment key={key}>
      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 overflow-y-auto">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-3 mt-6 mb-6 items-center">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">{title}</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems
              setOpen={setOpen}
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              useStateBasedMenu={useStateBasedMenu}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 h-screen flex-col border-r bg-gray-900 p-6 lg:flex overflow-hidden">
        <div
          onClick={() => {
            if (!useStateBasedMenu) navigate("/admin/dashboard");
          }}
          className="flex cursor-pointer items-center gap-3 mb-8 hover:bg-gray-700 p-3 rounded-lg transition duration-200 ease-in-out"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold text-white">{title}</h1>
        </div>

        <MenuItems
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          useStateBasedMenu={useStateBasedMenu}
        />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
