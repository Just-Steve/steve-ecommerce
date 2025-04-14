import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";

// Dummy analytics data
const dummyAnalytics = {
  totalRevenue: 25000,
  totalOrders: 450,
  averageOrderValue: 55.56,
  topSellingProduct: "Elegant Red Dress",
  dailySales: [
    { date: "2023-03-14", revenue: 1500 },
    { date: "2023-03-15", revenue: 1800 },
    { date: "2023-03-16", revenue: 2000 },
    { date: "2023-03-17", revenue: 2200 },
    { date: "2023-03-18", revenue: 2100 },
  ],
};

// Colors for Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminAdvancedAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics(dummyAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Advanced Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          View detailed analytics and key performance metrics.
        </p>
      </header>

      {loading ? (
        <div className="py-12 text-center">
          <p className="text-2xl text-gray-600">Loading analytics...</p>
        </div>
      ) : (
        <>
          {/* Summary Metrics */}
          <section className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800">Total Revenue</h3>
              <p className="text-xl text-green-600 mt-2">${analytics.totalRevenue.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-800">Total Orders</h3>
              <p className="text-xl text-blue-600 mt-2">{analytics.totalOrders}</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-gray-800">Avg. Order Value</h3>
              <p className="text-xl text-purple-600 mt-2">${analytics.averageOrderValue}</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-800">Top Product</h3>
              <p className="text-xl text-orange-600 mt-2">{analytics.topSellingProduct}</p>
            </motion.div>
          </section>

          {/* Bar Chart for Daily Sales */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Daily Sales Trend</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.dailySales}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Animated Line Chart */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sales Over Time (Animated)</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.dailySales}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#FF8042" strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                    animationBegin={0} animationDuration={1500} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Pie Chart for Sales Distribution */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sales Distribution</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={analytics.dailySales} dataKey="revenue" cx="50%" cy="50%" outerRadius={100} label>
                    {analytics.dailySales.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminAdvancedAnalyticsDashboard;
