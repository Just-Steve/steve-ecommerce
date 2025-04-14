import React, { useState, useEffect } from "react";

// Dummy data simulating user's saved addresses
const dummyAddresses = [
  {
    id: 1,
    label: "Home",
    fullName: "Jane Mimo",
    street: "123 Main Street",
    city: "Singfield",
    state: "Iads",
    postalCode: "62704",
    country: "Kenya",
    phone: "0754123-4567",
  },
  {
    id: 2,
    label: "Work",
    fullName: "Steve Hyven",
    street: "456 Corporate Blvd",
    city: "Naivasha",
    state: "Kenya",
    postalCode: "10001",
    country: "Kenya",
    phone: "0765 987-6543",
  },
];

const UserSavedAddresses = () => {
  // State for addresses list and form mode (add or edit)
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State for form fields and mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [label, setLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Simulate API call to fetch saved addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      // Simulated network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setAddresses(dummyAddresses);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch addresses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handler for resetting form fields
  const resetForm = () => {
    setLabel("");
    setFullName("");
    setStreet("");
    setCity("");
    setStateField("");
    setPostalCode("");
    setCountry("");
    setPhone("");
    setFormError("");
    setFormSuccess("");
    setIsEditing(false);
    setCurrentAddress(null);
  };

  // Validate the address form
  const validateForm = () => {
    if (!label || !fullName || !street || !city || !stateField || !postalCode || !country || !phone) {
      return "Please fill in all required fields.";
    }
    return "";
  };

  // Handler for adding a new address
  const handleAddAddress = (e) => {
    e.preventDefault();
    setFormError("");
    const errorMsg = validateForm();
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }
    const newAddress = {
      id: Date.now(),
      label,
      fullName,
      street,
      city,
      state: stateField,
      postalCode,
      country,
      phone,
    };
    // In a real app, call API to save address here
    setAddresses((prev) => [...prev, newAddress]);
    setFormSuccess("Address added successfully!");
    resetForm();
  };

  // Handler for updating an existing address
  const handleUpdateAddress = (e) => {
    e.preventDefault();
    setFormError("");
    const errorMsg = validateForm();
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }
    const updatedAddress = {
      ...currentAddress,
      label,
      fullName,
      street,
      city,
      state: stateField,
      postalCode,
      country,
      phone,
    };
    // In a real app, call API to update address here
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === currentAddress.id ? updatedAddress : addr))
    );
    setFormSuccess("Address updated successfully!");
    resetForm();
  };

  // Handler for editing an address (populate form)
  const handleEditClick = (address) => {
    setIsEditing(true);
    setCurrentAddress(address);
    setLabel(address.label);
    setFullName(address.fullName);
    setStreet(address.street);
    setCity(address.city);
    setStateField(address.state);
    setPostalCode(address.postalCode);
    setCountry(address.country);
    setPhone(address.phone);
    setFormError("");
    setFormSuccess("");
  };

  // Handler for removing an address
  const handleRemoveAddress = (id) => {
    // In a real app, call API to remove address here
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  // Render a single address card
  const renderAddressCard = (address) => (
    <div key={address.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">{address.label}</h3>
        <div>
          <button onClick={() => handleEditClick(address)} className="text-blue-600 hover:underline mr-4">
            Edit
          </button>
          <button onClick={() => handleRemoveAddress(address.id)} className="text-red-600 hover:underline">
            Remove
          </button>
        </div>
      </div>
      <p className="text-gray-700 mt-2">{address.fullName}</p>
      <p className="text-gray-700">{address.street}, {address.city}</p>
      <p className="text-gray-700">{address.state} {address.postalCode}</p>
      <p className="text-gray-700">{address.country}</p>
      <p className="text-gray-700 mt-2">Phone: {address.phone}</p>
    </div>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Saved Addresses
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Manage your shipping addresses for a smoother checkout experience.
        </p>
      </header>

      {/* Address List */}
      <section className="mb-12">
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-2xl text-gray-600">Loading addresses...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">
            <p className="text-xl">{error}</p>
          </div>
        ) : addresses.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            You have no saved addresses.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addresses.map((address) => renderAddressCard(address))}
          </div>
        )}
      </section>

      {/* Address Form Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>
        <form onSubmit={isEditing ? handleUpdateAddress : handleAddAddress} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Home, Work"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={stateField}
                onChange={(e) => setStateField(e.target.value)}
                placeholder="State"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal Code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {formError && (
            <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
              {formError}
            </div>
          )}
          {formSuccess && (
            <div className="p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
              {formSuccess}
            </div>
          )}
          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? "Update Address" : "Add Address"}
            </button>
          </div>
        </form>
      </section>

    

      {/* Footer */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          User Saved Addresses &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserSavedAddresses;
