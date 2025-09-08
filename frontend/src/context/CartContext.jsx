import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product, qty = 1) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  // Update quantity of a product
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item._id === id ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  // Remove product from cart
  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item._id !== id));

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
