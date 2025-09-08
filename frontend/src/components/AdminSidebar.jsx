// src/components/admin/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <img
          src={
            user?.avatar
              ? `http://localhost:5000/${user.avatar}`
              : "/default-avatar.png"
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold">{user?.name || "Admin"}</h3>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/admin/dashboard" className="block hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/admin/users" className="block hover:text-gray-300">
          Users
        </Link>
        <Link to="/admin/products" className="block hover:text-gray-300">
          Products
        </Link>
        <Link to="/admin/orders" className="block hover:text-gray-300">
          Orders
        </Link>
        <Link to="/admin/profile" className="block hover:text-gray-300">
          Profile
        </Link>
      </nav>

      {/* Logout at bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
