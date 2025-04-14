import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../redux/features/auth/authService";

// Import all your panel components
import UserSidebar from "./UserSidebar";
import UserDashboard from "../pages/UserDashboard";
import UserProfile from "../pages/UserProfile";
import UserPayments from "../pages/UserPayments";
import UserOrders from "../pages/UserOrders";
import UserChatSupport from "../pages/UserChatSupport";
import UserRecentlyViewed from "../pages/UserRecentlyViewed";
import UserReturnsRefunds from "../pages/UserReturnsRefunds";
import UserSavedAddresses from "../pages/UserSavedAddresses";
import UserLoyaltyProgram from "../pages/UserLoyaltyProgram";
import UserGiftCards from "../pages/UserGiftCards";
import UserReferralProgram from "../pages/UserReferralProgram";
import UserNotificationCenter from "../pages/UserNotificationCenter";
import UserWishlist from "../pages/UserWishlist";
import UserCart from "../pages/UserCart";
import UserCheckout from "../pages/UserCheckout";
import UserProductDetails from "../pages/UserProductDetails";
import UserOrderConfirmation from "../pages/UserOrderConfirmation";
import UserAccountSettings from "../pages/UserAccountSettings";
import UserLogoutButton from "../pages/UserLogoutButton";
import UserSupport from "../pages/UserSupport";
import OrderHistory from "../pages/OrderHistory";

const UserPanel = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("UserDashboard");

  // Debug: Log active component changes
  useEffect(() => {
    console.log("Active component:", activeComponent);
  }, [activeComponent]);

  // Check authentication on mount
 

  // Mapping of component names to actual components
  const componentMap = {
    UserDashboard: <UserDashboard />,
    UserProfile: <UserProfile />,
    UserPayments: <UserPayments />,
    UserOrders: <UserOrders />,
    UserChatSupport: <UserChatSupport />,
    UserRecentlyViewed: <UserRecentlyViewed />,
    UserReturnsRefunds: <UserReturnsRefunds />,
    UserSavedAddresses: <UserSavedAddresses />,
    UserLoyaltyProgram: <UserLoyaltyProgram />,
    UserGiftCards: <UserGiftCards />,
    UserReferralProgram: <UserReferralProgram />,
    UserNotificationCenter: <UserNotificationCenter />,
    UserWishlist: <UserWishlist />,
    OrderHistory: <OrderHistory />,
    UserCart: <UserCart />,
    UserCheckout: <UserCheckout />,
    UserProductDetails: <UserProductDetails />,
    UserOrderConfirmation: <UserOrderConfirmation />,
    UserAccountSettings: <UserAccountSettings />,
    UserLogoutButton: <UserLogoutButton />,
    UserSupport: <UserSupport />,
  };

  return (
    <div className="flex h-screen">
      <UserSidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="flex-1 p-5">
        {componentMap[activeComponent] || <UserDashboard />}
      </div>
    </div>
  );
};

export default UserPanel;



