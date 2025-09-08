// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import OrderDetails from './pages/OrderDetails';
import About from './pages/About';
import Contact from "./pages/Contact";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./pages/MainLayout";
import { Toaster } from 'react-hot-toast';
import Wishlist from "./pages/Wishlist";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import ProductsAdmin from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/admin/AdminProfile";



function App() {
  return (
    <>
    
      

    <Toaster />
    <Routes>

      {/* Public site with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="order/:id" element={<OrderDetails />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />}/>
      </Route>

      {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<AdminProfile/>}/>
        </Route>




    </Routes>


        
    </>
  );
}

export default App;

