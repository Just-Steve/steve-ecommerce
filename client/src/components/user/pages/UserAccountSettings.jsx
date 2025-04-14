import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Uncomment if needed later

// Dummy user data for account settings (In a real app, fetched from an API)
const dummyUserData = {
  name: "Steve Hyven",
  email: "stevehyven@example.com",
  phone: "077 987-6543",
  address: "123 Main Street, City, Country",
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
};

const UserAccountSettings = () => {
  // const navigate = useNavigate();

  // State for personal information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [personalInfoLoading, setPersonalInfoLoading] = useState(false);
  const [personalInfoMessage, setPersonalInfoMessage] = useState({ success: "", error: "" });

  // State for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ success: "", error: "" });

  // State for notification preferences
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    push: false,
  });
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsMessage, setNotificationsMessage] = useState({ success: "", error: "" });

  // Simulate fetching user account data on mount
  useEffect(() => {
    // Simulated API delay
    setTimeout(() => {
      setName(dummyUserData.name);
      setEmail(dummyUserData.email);
      setPhone(dummyUserData.phone);
      setAddress(dummyUserData.address);
      setNotifications(dummyUserData.notifications);
    }, 800);
  }, []);

  // Handler for updating personal information
  const handlePersonalInfoUpdate = (e) => {
    e.preventDefault();
    setPersonalInfoLoading(true);
    setPersonalInfoMessage({ success: "", error: "" });
    
    // Simple validation
    if (!name || !email || !phone || !address) {
      setPersonalInfoMessage({ success: "", error: "Please fill in all personal information fields." });
      setPersonalInfoLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      setPersonalInfoMessage({ success: "Personal information updated successfully!", error: "" });
      setPersonalInfoLoading(false);
      // Uncomment the line below to navigate or perform additional actions
      // navigate('/some-route');
    }, 1000);
  };

  // Handler for changing password
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ success: "", error: "" });
    
    // Validate password fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ success: "", error: "All password fields are required." });
      setPasswordLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ success: "", error: "New password and confirmation do not match." });
      setPasswordLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      setPasswordMessage({ success: "Password changed successfully!", error: "" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordLoading(false);
    }, 1200);
  };

  // Handler for toggling notification preferences
  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Handler for saving notification settings
  const handleSaveNotifications = (e) => {
    e.preventDefault();
    setNotificationsLoading(true);
    setNotificationsMessage({ success: "", error: "" });
    
    // Simulate API call delay
    setTimeout(() => {
      setNotificationsMessage({ success: "Notification preferences updated successfully!", error: "" });
      setNotificationsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900">Account Settings</h1>
        <p className="text-xl text-gray-600 mt-2">
          Manage your personal information, update your password, and configure your notifications.
        </p>
      </header>

      {/* Personal Information Section */}
      <section className="mb-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Personal Information</h2>
        <form onSubmit={handlePersonalInfoUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={personalInfoLoading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                personalInfoLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {personalInfoLoading ? "Saving..." : "Update Information"}
            </button>
          </div>
        </form>
        {(personalInfoMessage.error || personalInfoMessage.success) && (
          <div className="mt-4">
            {personalInfoMessage.error && (
              <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                {personalInfoMessage.error}
              </div>
            )}
            {personalInfoMessage.success && (
              <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                {personalInfoMessage.success}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Password Change Section */}
      <section className="mb-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                passwordLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {passwordLoading ? "Updating Password..." : "Change Password"}
            </button>
          </div>
        </form>
        {(passwordMessage.error || passwordMessage.success) && (
          <div className="mt-4">
            {passwordMessage.error && (
              <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                {passwordMessage.error}
              </div>
            )}
            {passwordMessage.success && (
              <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                {passwordMessage.success}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Notification Preferences Section */}
      <section className="mb-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
        <form onSubmit={handleSaveNotifications} className="grid grid-cols-1 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationToggle("email")}
              className="mr-3 h-5 w-5 text-blue-600"
            />
            <label className="text-lg text-gray-700">Email Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationToggle("sms")}
              className="mr-3 h-5 w-5 text-blue-600"
            />
            <label className="text-lg text-gray-700">SMS Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationToggle("push")}
              className="mr-3 h-5 w-5 text-blue-600"
            />
            <label className="text-lg text-gray-700">Push Notifications</label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={notificationsLoading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors ${
                notificationsLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {notificationsLoading ? "Saving Preferences..." : "Save Preferences"}
            </button>
          </div>
        </form>
        {(notificationsMessage.error || notificationsMessage.success) && (
          <div className="mt-4">
            {notificationsMessage.error && (
              <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                {notificationsMessage.error}
              </div>
            )}
            {notificationsMessage.success && (
              <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                {notificationsMessage.success}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Account Settings &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserAccountSettings;
