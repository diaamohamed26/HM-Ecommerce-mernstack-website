import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [loading, setLoading] = useState(false);

  // Prices
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    if (!user) return alert("Please login first!");
    if (!cart || cart.length === 0) return alert("Your cart is empty!");

    const formattedOrderItems = cart.map(item => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      product: item._id,
    }));

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: formattedOrderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("Order placed successfully!");
      console.log("Order created:", data);
      clearCart();
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Full-width Hero */}
      <section className="hero w-screen -mx-4  relative flex items-center justify-center h-64 md:h-72  ">
        <div className="absolute inset-0"></div>
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Checkout
        </motion.h1>
      </section>

      {/* Centered Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 mt-10">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>
          {[
            { name: "address", label: "Address" },
            { name: "city", label: "City" },
            { name: "postalCode", label: "Postal Code" },
            { name: "country", label: "Country" },
          ].map(({ name, label }) => (
            <input
              key={name}
              type="text"
              placeholder={label}
              value={shippingAddress[name]}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, [name]: e.target.value })
              }
              className="border border-gray-300 rounded p-2 mb-3 w-full focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>

        {/* Cart Items */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Cart Items</h3>
          {cart.length === 0 && <p>Your cart is empty</p>}

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-between items-center mb-3 border-b pb-2"
              >
                <span className="font-medium">
                  {item.name} x {item.qty}
                </span>
                <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2">
            <p>Items: <span className="font-medium">${itemsPrice.toFixed(2)}</span></p>
            <p>Shipping: <span className="font-medium">${shippingPrice.toFixed(2)}</span></p>
            <p>Tax: <span className="font-medium">${taxPrice.toFixed(2)}</span></p>
            <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <button
            onClick={placeOrderHandler}
            disabled={loading}
            className="mt-6 w-full bg-black hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
