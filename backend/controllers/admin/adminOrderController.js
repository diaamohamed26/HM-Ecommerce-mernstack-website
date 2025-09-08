import Order from "../../models/Order.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { isPaid, isDelivered } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      order.paidAt = isPaid ? Date.now() : null;
    }

    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      order.deliveredAt = isDelivered ? Date.now() : null;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
};
