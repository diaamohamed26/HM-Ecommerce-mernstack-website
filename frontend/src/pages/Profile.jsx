// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/users/profile");
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        console.error(err);
        logout();
        navigate("/");
      }
    };
    fetchProfile();
  }, [setUser, logout, navigate]);

  // ✅ Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/users/profile", {
        name,
        email,
        password: password || undefined,
      });
      setUser(data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Upload avatar
  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const { data } = await axios.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser({ ...user, avatar: data.avatar });
      setAvatarFile(null);
      alert("Avatar updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar.");
    }
  };

  // ✅ Logout (go to homepage)
  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to homepage
  };

  return (
    <div className="max-w-3xl mx-auto  bg-white shadow rounded-lg p-8 mt-30">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👤 My Profile</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          🚪 Logout
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={user?.avatar ? `http://localhost:5000/${user.avatar}` : "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="mb-2"
          />
          {avatarFile && (
            <button
              onClick={handleAvatarUpload}
              className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700"
            >
              Upload Avatar
            </button>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
