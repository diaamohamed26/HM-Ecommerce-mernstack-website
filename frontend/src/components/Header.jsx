import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Heart } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const { user, setUser, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist() || { wishlist: [] };

  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [menuOpen, setMenuOpen] = useState(false); // profile dropdown
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const ref = useRef();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Products" },
    { to: "/checkout", label: "Checkout" },
    { to: "/contact", label: "Contact" },
  ];

  // track scroll for shrink effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // avatar preview
  useEffect(() => {
    if (!avatarFile) return;
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const { data } = await axios.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((prev) => ({ ...prev, avatar: data.avatar }));
      setAvatarFile(null);
      setAvatarPreview(null);
      alert("Avatar updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      animate={{
        height: scrolled ? "60px" : "80px",
        boxShadow: scrolled
          ? "0 2px 8px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white fixed top-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
            alt="Logo"
            className="h-8"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-800 hover:text-red-600 transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4" ref={ref}>
          <div className="relative flex items-center">
            {/* Search Toggle Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
              className="rounded-full hover:bg-gray-100 transition"
            >
              <FaSearch className="text-gray-700 text-lg " />
            </button>

            {/* Animated Search Input */}
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: showSearch ? 220 : 0,
                opacity: showSearch ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  navigate(`/products?search=${query}`);
                  setShowSearch(false);
                }
              }}
              placeholder="Search for products..."
              className={`ml-2 px-4 py-2 rounded-full text-sm bg-white/90 border border-gray-300 shadow-md
                focus:ring-2 focus:ring-red-500 focus:border-red-500 
                backdrop-blur-md transition-all duration-300 
                ${showSearch ? "pr-10" : "hidden"}`}
            />
          </div>




          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <Heart className="w-6 h-6 text-gray-600" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative" aria-label="Cart">
            <FaShoppingCart className="text-gray-600 text-lg" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <img
                src={
                  avatarPreview ||
                  (user.avatar
                    ? `http://localhost:5000/${user.avatar}`
                    : "/default-avatar.png")
                }
                alt={user.name || "Profile"}
                className="w-9 h-9 rounded-full border cursor-pointer object-cover"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
                >
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>

                  <div className="px-4 py-2 border-b space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAvatarFile(e.target.files[0])}
                      className="text-sm"
                    />
                    {avatarFile && (
                      <button
                        onClick={handleAvatarUpload}
                        className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                      >
                        Upload
                      </button>
                    )}
                  </div>

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to="/login" aria-label="Login">
              <FaUser className="text-gray-600 text-lg" />
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg px-4 py-3 space-y-4"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          {user && (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={
                    user.avatar
                      ? `http://localhost:5000/${user.avatar}`
                      : "/default-avatar.png"
                  }
                  alt={user.name || "Profile"}
                  className="w-8 h-8 rounded-full border"
                />
                <span>{user.name}</span>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block hover:text-red-600"
              >
                Profile
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-red-600"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Header;
