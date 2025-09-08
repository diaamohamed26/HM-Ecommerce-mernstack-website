import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { addOrder, getMyOrders, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", protect, addOrder);

// Get logged in user's orders
router.get("/myorders", protect, getMyOrders);

// Admin: get all orders
router.get("/", protect, admin, getOrders);

export default router;
