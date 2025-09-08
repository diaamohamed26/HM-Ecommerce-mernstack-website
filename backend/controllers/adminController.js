import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    // Daily Sales example
    const dailySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top Categories example
    const topCategories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({ totalUsers, totalOrders, totalProducts, dailySales, topCategories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
