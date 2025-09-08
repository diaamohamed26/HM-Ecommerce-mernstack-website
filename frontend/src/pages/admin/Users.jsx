import { useEffect, useState } from "react";
import axios from "../../api/axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    const { data } = await axios.get(`/admin/users?search=${search}`);
    setUsers(data);
  };

  const handleRoleChange = async (id, role) => {
    await axios.put(`/admin/users/${id}`, { role });
    fetchUsers();
  };

  const toggleBlock = async (id, isBlocked) => {
    await axios.put(`/admin/users/${id}`, { isBlocked: !isBlocked });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">👤 User Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded-lg w-full md:w-1/3"
      />

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  {user.isBlocked ? (
                    <span className="text-red-600">Blocked</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => toggleBlock(user._id, user.isBlocked)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isBlocked ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
