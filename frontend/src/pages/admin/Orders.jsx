import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const updateOrder = async (id, updates) => {
    try {
      const { data } = await axios.put(`/api/admin/orders/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setOrders((prev) => prev.map(o => o._id === data._id ? data : o));
    } catch (error) {
      console.error("Error updating order", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Orders</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>User</th>
            <th>Total Items</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border">
              <td>{order.user?.name} ({order.user?.email})</td>
              <td>{order.orderItems.reduce((sum, item) => sum + item.qty, 0)}</td>
              <td>{order.isPaid ? "✅" : "❌"}</td>
              <td>{order.isDelivered ? "✅" : "❌"}</td>
              <td className="space-x-2">
                <button
                  onClick={() => updateOrder(order._id, { isPaid: !order.isPaid })}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  {order.isPaid ? "Unmark Paid" : "Mark Paid"}
                </button>
                <button
                  onClick={() => updateOrder(order._id, { isDelivered: !order.isDelivered })}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  {order.isDelivered ? "Unmark Delivered" : "Mark Delivered"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
