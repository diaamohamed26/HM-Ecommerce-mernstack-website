import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // ✅ use your axios instance
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#4F46E5", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    dailySales: [],
    topCategories: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/admin/dashboard"); // token auto-attached
        setStats({
          totalOrders: data.totalOrders || 0,
          totalUsers: data.totalUsers || 0,
          totalProducts: data.totalProducts || 0,
          dailySales: data.dailySales || [],
          topCategories: data.topCategories || [],
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-xl p-6">
          <h2 className="text-sm uppercase opacity-80">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-2xl shadow-xl p-6">
          <h2 className="text-sm uppercase opacity-80">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-xl p-6">
          <h2 className="text-sm uppercase opacity-80">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Daily Sales</h2>
          {stats.dailySales.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No sales data available.</p>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Categories</h2>
          {stats.topCategories.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.topCategories}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No category data available.</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/admin/products"
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          ➕ Add Product
        </Link>
        <Link
          to="/admin/orders"
          className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl shadow hover:bg-gray-200 transition"
        >
          📦 Manage Orders
        </Link>
        <Link
          to="/admin/users"
          className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow hover:bg-pink-700 transition"
        >
          👤 Manage Users
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
