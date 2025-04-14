



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

// Import all your page components
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
import { OrderHistory } from "..";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("UserDashboard");

  useEffect(() => {
    console.log("Current active component:", activeComponent);
  }, [activeComponent]);

  // Map the string key (e.g., "UserPayments") to the actual component
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
    UserCart: <UserCart />,
    OrderHistory: <OrderHistory />,
    UserCheckout: <UserCheckout />,
    UserProductDetails: <UserProductDetails />,
    UserOrderConfirmation: <UserOrderConfirmation />,
    UserAccountSettings: <UserAccountSettings />,
    UserLogoutButton: <UserLogoutButton />,
    UserSupport: <UserSupport />,
  };

  // Renders the correct component based on activeComponent
  const renderComponent = () => {
    // If the componentMap doesn't have the key, fall back to UserDashboard
    return componentMap[activeComponent] || <UserDashboard />;
  };

  return (
    <div className="flex">
      {/* Pass setActiveComponent down so sidebar can update the state */}
      <UserSidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 p-5">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
