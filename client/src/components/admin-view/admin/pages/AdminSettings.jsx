import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";

const AdminSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [siteName, setSiteName] = useState("Fashion Haven");
  const [logo, setLogo] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Page */}
      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/H5BOVymHiplawzr0/videoblocks-a-group-of-dressmakers-are-working-on-a-new-model-of-dress-seamstresses-do-the-fitting-of-the-dress-young-fashion-designer-and-her-assistant-discuss-in-the-atelier_smgpl5zljm__af0af3b4a5ad4daf92d33fe280991bdb__P360.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl font-bold text-white">Welcome to Admin Settings</h1>
          <p className="mt-4 text-xl text-gray-200">
            Customize your site, manage security, and control notifications.
          </p>
          <Button className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
            Get Started
          </Button>
        </div>
      </div>

      {/* Settings Section */}
      <div className="p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Settings</h2>
        
        {/* Site Settings */}
        <Card className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">General Settings</h3>
          <CardContent className="mt-4 space-y-4">
            <div>
              <Label>Site Name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div>
              <Label>Site Logo</Label>
              <input type="file" onChange={handleLogoUpload} className="block mt-2" />
              {logo && <img src={logo} alt="Logo Preview" className="mt-4 h-16" />}
            </div>
            <div>
              <Label>Currency</Label>
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="KES">KES</option>
                <option value="EUR">EUR</option>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">Security Settings</h3>
          <CardContent className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Two-Factor Authentication</span>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${darkMode ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable 2FA</span>
                <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
              </Switch>
            </div>
          </CardContent>
        </Card>
        
        {/* Email & Notifications */}
        <Card className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">Email Notifications</h3>
          <CardContent className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span>Receive Email Alerts</span>
              <Switch
                checked={emailNotifications}
                onChange={setEmailNotifications}
                className={`${emailNotifications ? "bg-blue-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable Email Alerts</span>
                <span className={`${emailNotifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
              </Switch>
            </div>
          </CardContent>
        </Card>
        
        {/* Save Settings Button */}
        <Button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
