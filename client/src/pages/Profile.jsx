import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import user_profile  from '../assets/images/user_profile.jpg';
function Profile() {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // must be stored at login

  

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
      toast.error('Failed to fetch user profile');
      console.error('Failed to fetch user:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token, userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = { ...editForm };

    if (!payload.password) {
      delete payload.password;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/user/update-profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Check for duplicate error message from backend
        if (data.details && data.details.toLowerCase().includes('duplicate')) {
          toast.error('This user already exists.');
          return;
        }
        toast.error(data.error || 'Failed to update profile');
        
        return;
      }

      toast.success('Profile updated successfully!');
      await fetchUser();
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
        {user ? (
          <>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center">
            <img src={user_profile} alt="user_profile" />
          <h1 className='text-[30px] font-bold'>{user.fullName}</h1>
          </div>
        </div>
       
            {/* <p><strong>Name:</strong> {user.fullName}</p> */}
           <div className='mt-4'> 
             <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
            <p><strong>Location:</strong> {user.location || 'N/A'}</p>
            <p><strong>Password:</strong> ******</p>
           </div>
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
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
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
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Save
                </button>
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

      {/* Toast container to show toast messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Profile;
