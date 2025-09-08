import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Checkout handler
  const handleCheckout = () => {
    if (!cart.length) return alert("Your cart is empty!");
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="w-screen hero relative flex items-center justify-center h-52 md:h-64 bg-gradient-to-r mb-10">
        <div className="absolute inset-0 "></div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center z-10">
          Shopping Cart
        </h1>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        {/* Empty cart */}
        {!cart.length ? (
          <div className="text-center p-8 border rounded-lg bg-white shadow-md">
            <p className="text-lg mb-4 text-gray-600">Your cart is empty.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-5 border rounded-lg shadow-sm bg-white"
                >
                  {/* Product info */}
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-600">
                      ${item.price} x {item.qty} ={" "}
                      <span className="font-bold text-gray-900">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.qty + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-3 text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="p-6 border rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white px-6 py-3 rounded-lg mt-6 hover:bg-gray-800 transition font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
