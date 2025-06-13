import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function Profile() {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // must be stored at login

  // ✅ Moved fetchUser outside useEffect
  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
      setEditForm({
        fullName: data.fullName || '',
        email: data.email || '',
        gender: data.gender || '',
        location: data.location || '',
        password: '', // leave blank for new password input
      });
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token, userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = { ...editForm };

    // Don't send empty password field if user didn't enter new password
    if (!payload.password) {
      delete payload.password;
    }

    const res = await fetch(`http://localhost:5000/api/user/update-profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchUser(); // Refresh data
      setShowEditModal(false);
    } else {
      console.error('Failed to update profile');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
            <p><strong>Location:</strong> {user.location || 'N/A'}</p>
            <p><strong>Password:</strong> ******</p>
            <button
              onClick={() => setShowEditModal(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="New Password (leave blank to keep current)"
                value={editForm.password}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={editForm.gender}
                onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
