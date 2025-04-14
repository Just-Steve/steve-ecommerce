import React, { useState, useEffect } from "react";

// Dummy data for user profile and recent activity
const dummyUserData = {
  name: "Steve Hyven",
  email: "stevehyven@example.com",
  phone: "0789 987-6543",
  address: "123 Main Street, City, Country",
  joined: "March 2024",
  profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxiBTD1DIz8V7L4a0GBoQp2MVNpQ3nta6zw&s",
};

const dummyRecentActivity = [
  { id: 1, activity: "Ordered 'Elegant Red Dress'", date: "2025-03-20" },
  { id: 2, activity: "Updated profile information", date: "2025-03-18" },
  { id: 3, activity: "Left a review on 'Casual Blue Top'", date: "2025-03-15" },
  { id: 4, activity: "Added item to wishlist", date: "2025-03-10" },
];

const UserProfile = () => {
  // Profile state management
  const [userData, setUserData] = useState(dummyUserData);
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(dummyUserData.profilePicture);
  const [name, setName] = useState(dummyUserData.name);
  const [email, setEmail] = useState(dummyUserData.email);
  const [phone, setPhone] = useState(dummyUserData.phone);
  const [address, setAddress] = useState(dummyUserData.address);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);

  // Simulate fetching recent activity and user data on mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRecentActivity(dummyRecentActivity);
      setLoading(false);
    }, 1000);
  }, []);

  // Handler for profile picture file input
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicture(previewUrl);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Handle profile update (dummy API simulation)
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Validate required fields
    if (!name || !email || !phone || !address) {
      setErrorMessage("All fields marked with * are required.");
      setLoading(false);
      return;
    }

    // Simulate an API call to update the profile data
    setTimeout(() => {
      // In a real app, here you'd send updated data to the server
      setUserData({
        ...userData,
        name,
        email,
        phone,
        address,
        profilePicture,
      });
      setSuccessMessage("Profile updated successfully!");
      setEditMode(false);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-2">
          View and update your personal information, manage settings, and check your recent activity.
        </p>
      </header>

      {/* Profile Overview Section */}
      <section className="bg-white shadow-xl rounded-lg p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Profile Picture */}
          <div className="w-48 h-48 relative">
            <img
              src={profilePicture}
              alt={name}
              className="w-full h-full object-cover rounded-full border-4 border-indigo-600"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
              />
            )}
          </div>
          {/* Profile Details */}
          <div className="mt-6 md:mt-0 md:ml-8 flex-1">
            {!editMode ? (
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-600 mt-2"><strong>Email:</strong> {userData.email}</p>
                <p className="text-gray-600 mt-1"><strong>Phone:</strong> {userData.phone}</p>
                <p className="text-gray-600 mt-1"><strong>Address:</strong> {userData.address}</p>
                <p className="text-gray-600 mt-1"><strong>Member Since:</strong> {userData.joined}</p>
                <button
                  onClick={toggleEditMode}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
                    {successMessage}
                  </div>
                )}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={toggleEditMode}
                    className="mr-4 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="bg-white shadow-xl rounded-lg p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="py-3">
                <p className="text-gray-700">{activity.activity}</p>
                <p className="text-gray-500 text-sm">{activity.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent activity to display.</p>
        )}
      </section>

      {/* Settings and Additional Information */}
      <section className="bg-white shadow-xl rounded-lg p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-4">
          Here you can manage your account settings, such as changing your password, configuring notifications, and linking social accounts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Change Password</h3>
            <p className="text-gray-600 text-sm">Secure your account by updating your password regularly.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Notification Preferences</h3>
            <p className="text-gray-600 text-sm">Manage your email and SMS notifications.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Profile &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

  
    </div>
  );
};

export default UserProfile;
