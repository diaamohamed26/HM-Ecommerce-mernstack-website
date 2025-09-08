import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

import connectDB from "./config/db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import userRoutes from "./routes/userRoutes.js";


// Admin routes
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import adminDashboardRoutes from "./routes/adminRoutes.js";
import adminProductRoutes from "./routes/admin/productRoutes.js";
import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js"

dotenv.config();

// 1️⃣ Create Express app
const app = express();

// 2️⃣ Connect Database
connectDB();

// 3️⃣ Middleware
app.use(cors());
app.use(express.json());

// ⬇️ serve static images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);

// Admin routes
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
// ==========================================

// 4️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
