import React from "react";

const UserSidebar = ({ activeComponent, setActiveComponent }) => {
  const menuItems = [
    { label: "Dashboard", component: "UserDashboard" },
    { label: "Profile", component: "UserProfile" },
    { label: "Payments", component: "UserPayments" },
    { label: "Orders", component: "UserOrders" },
    { label: "Chat Support", component: "UserChatSupport" },
    { label: "Recently Viewed", component: "UserRecentlyViewed" },
    { label: "Returns & Refunds", component: "UserReturnsRefunds" },
    { label: "Saved Addresses", component: "UserSavedAddresses" },
    { label: "Loyalty Program", component: "UserLoyaltyProgram" },
    { label: "Rewards", component: "UserRewards" },
    { label: "Referral Program", component: "UserReferralProgram" },
    { label: "Saved Addresses", component: "UserSavedAddresses" },
    { label: "Order History", component: "OrderHistory" },
    { label: "Gift Cards", component: "UserGiftCards" },
    { label: "Referral Program", component: "UserReferralProgram" },
    { label: "Notifications", component: "UserNotificationCenter" },
    { label: "Wishlist", component: "UserWishlist" },
    { label: "Cart", component: "UserCart" },
    { label: "Checkout", component: "UserCheckout" },
    { label: "Product Details", component: "UserProductDetails" },
    { label: "Order Confirmation", component: "UserOrderConfirmation" },
    { label: "Account Settings", component: "UserAccountSettings" },
    { label: "Logout", component: "UserLogoutButton" },
    { label: "Support", component: "UserSupport" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.component}
              onClick={() => {
                console.log("Clicked on:", item.component);
                setActiveComponent(item.component);
              }}
              className={`cursor-pointer p-3 rounded-md mb-2 transition-colors duration-200 ease-in-out ${
                activeComponent === item.component
                  ? "bg-gray-800"
                  : "hover:bg-gray-700"
              }`}
              aria-current={
                activeComponent === item.component ? "page" : undefined
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;



