import express from "express";
import { getAllOrders, updateOrderStatus } from "../../controllers/admin/adminOrderController.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Get all orders (Admin only)
router.get("/", protect, admin, getAllOrders);

// Update order status (paid/delivered)
router.put("/:id", protect, admin, updateOrderStatus);

export default router;
