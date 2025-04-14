import React, { useState, useEffect } from "react";

// Dummy sales data for demonstration purposes
const dummySalesData = [
  {
    id: 1,
    date: "2023-03-15",
    totalSales: 1500.50,
    orders: 25,
    topProduct: "Elegant Red Dress",
  },
  {
    id: 2,
    date: "2023-03-14",
    totalSales: 980.75,
    orders: 18,
    topProduct: "Casual Blue Top",
  },
  {
    id: 3,
    date: "2023-03-13",
    totalSales: 1200.00,
    orders: 20,
    topProduct: "Flowy Floral Dress",
  },
  {
    id: 4,
    date: "2023-03-12",
    totalSales: 750.25,
    orders: 12,
    topProduct: "Stylish Black Skirt",
  },
  {
    id: 5,
    date: "2023-03-11",
    totalSales: 1340.90,
    orders: 22,
    topProduct: "Comfortable White Blouse",
  },
  {
    id: 6,
    date: "2023-03-10",
    totalSales: 1650.30,
    orders: 27,
    topProduct: "Elegant Black Heels",
  },
  // Add additional sales data as needed
];

const AdminSalesReportsDashboard = () => {
  // State for sales data and filters
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sales data (simulate API call)
  const fetchSalesData = async () => {
    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSalesData(dummySalesData);
      setFilteredData(dummySalesData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch sales data.");
      setLoading(false);
    }
  };

  // Load sales data on mount
  useEffect(() => {
    fetchSalesData();
  }, []);

  // Handle date filter changes and filter sales data
  const handleFilter = () => {
    if (startDate === "" && endDate === "") {
      setFilteredData(salesData);
      return;
    }
    const filtered = salesData.filter((record) => {
      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : new Date("1970-01-01");
      const end = endDate ? new Date(endDate) : new Date();
      return recordDate >= start && recordDate <= end;
    });
    setFilteredData(filtered);
  };

  // Calculate summary metrics
  const totalRevenue = filteredData.reduce((acc, record) => acc + record.totalSales, 0);
  const totalOrders = filteredData.reduce((acc, record) => acc + record.orders, 0);
  const averageOrderValue = filteredData.length > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  // Render a table row for each sales record
  const renderSalesRow = (record) => (
    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-gray-700">{record.date}</td>
      <td className="p-4 text-gray-700">${record.totalSales.toFixed(2)}</td>
      <td className="p-4 text-gray-700">{record.orders}</td>
      <td className="p-4 text-gray-700">{record.topProduct}</td>
    </tr>
  );

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Sales Reports Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Analyze daily sales data, view summary metrics, and filter reports by date range.
        </p>
      </header>

      {/* Date Filter Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-lg text-gray-700 mb-2">
            Start Date:
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-lg text-gray-700 mb-2">
            End Date:
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Filter Reports
          </button>
        </div>
      </section>

      {/* Summary Metrics Section */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Total Revenue</h3>
          <p className="text-xl text-green-600 mt-2">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Total Orders</h3>
          <p className="text-xl text-blue-600 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Average Order Value</h3>
          <p className="text-xl text-purple-600 mt-2">${averageOrderValue}</p>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading sales data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <>
          {/* Sales Data Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total Sales</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Orders</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Top Product</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-600">
                      No sales records found for the selected date range.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((record) => renderSalesRow(record))
                )}
              </tbody>
            </table>
          </div>

          {/* Additional Insights Section */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Additional Insights</h2>
            <p className="text-gray-600 mb-4">
              Explore trends and key metrics from the sales data. The information below provides extra details to help you understand sales performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Daily Sales Trend</h3>
                <p className="text-gray-600">
                  A summary of daily revenue fluctuations. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id arcu aliquet, elementum nisi quis, condimentum nibh.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Volume Analysis</h3>
                <p className="text-gray-600">
                  Analysis of order frequency and average order values. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, tincidunt turpis ac, pharetra augue.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer Section */}
      <footer className="mt-16 border-t pt-6">
        <p className="text-center text-gray-500 text-base">
          Admin Sales Reports Dashboard &copy; {new Date().getFullYear()} - All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default AdminSalesReportsDashboard;
