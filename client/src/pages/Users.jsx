// client/src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { formatDistanceToNow } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "Male",
    location: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Unauthorized or error fetching users");
        }
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error.message));
  }, [token]);

  // Delete confirm modal open
  const confirmDelete = (userId) => {
    setDeleteUserId(userId);
    setShowConfirm(true);
  };

  // Cancel delete modal
  const cancelDelete = () => {
    setDeleteUserId(null);
    setShowConfirm(false);
  };

  // Actual delete
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/admin/users/${deleteUserId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user.id !== deleteUserId));
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      })
      .finally(() => {
        setDeleteUserId(null);
        setShowConfirm(false);
      });
  };

  // Handle new admin input changes
  const handleAddAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new admin form
  const handleAddAdminSubmit = (e) => {
    e.preventDefault();
    setCreatingAdmin(true);

    fetch("http://localhost:5000/api/admin/create-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAdmin),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to create admin");
        toast.success("Admin created successfully!");
        setUsers((prev) => [
          ...prev,
          { ...newAdmin, role: "admin", id: data.adminId, created_at: new Date().toISOString() },
        ]);
        setShowAddAdmin(false);
        setNewAdmin({ fullName: "", email: "", password: "", gender: "Male", location: "" });
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setCreatingAdmin(false));
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Header + Add Admin button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Users</h1>
          <button
            onClick={() => setShowAddAdmin(true)}
            className="bg-[#F097B9] text-white px-4 py-2 rounded"
          >
            Add Admin
          </button>
        </div>

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Joined</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border">{user.fullName}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border capitalize">{user.gender}</td>
                <td className="py-2 px-4 border capitalize">{user.role}</td>
                <td className="py-2 px-4 border">
                  {user.created_at
                    ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true })
                    : "Unknown"}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => confirmDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 max-w-full text-center">
            <p className="mb-4 font-semibold text-lg">Ma rabtaa inaad tirtid?</p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Haa
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Maya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Admin</h2>
            <form onSubmit={handleAddAdminSubmit} className="space-y-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={newAdmin.fullName}
                onChange={handleAddAdminChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={handleAddAdminChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={handleAddAdminChange}
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="gender"
                value={newAdmin.gender}
                onChange={handleAddAdminChange}
                className="w-full p-2 border rounded"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={newAdmin.location}
                onChange={handleAddAdminChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  disabled={creatingAdmin}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {creatingAdmin ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Users;
