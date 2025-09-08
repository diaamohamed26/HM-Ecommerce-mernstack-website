import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // ✅ Adjust path if needed
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from "./context/UserContext.jsx"; // ✅ Import it!
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <UserProvider>
      <CartProvider>
      <AuthProvider>
       <WishlistProvider>
        <App />
       </WishlistProvider>
      </AuthProvider>
      </CartProvider>
     </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
