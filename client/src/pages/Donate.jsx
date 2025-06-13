import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDistanceToNow } from "date-fns";
import schdeule from "../assets/images/schedule.png";

function MakeDonor() {
  const [appointments, setAppointments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({
    bloodType: "",
    appointmentDate: "",
    location: "",
    donorName: ""
  });
  const [isMe, setIsMe] = useState(true);
  const [editForm, setEditForm] = useState({
    id: null,
    bloodType: "",
    appointmentDate: "",
    location: ""
  });
  const [deleteId, setDeleteId] = useState(null);

  // Added for search
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/api/donate/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAppointments(data.appointments || []);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        isMe,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Appointment created successfully");
      setForm({
        bloodType: "",
        appointmentDate: "",
        location: "",
        donorName: ""
      });
      setIsMe(true);
      setShowCreateModal(false);
      fetchAppointments();
    } else {
      toast.error(data.message || "Something went wrong");
    }
  };

  const openEditModal = (appointment) => {
    setEditForm({
      id: appointment.id,
      bloodType: appointment.bloodType,
      appointmentDate: appointment.appointmentDate.split("T")[0],
      location: appointment.location,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/donate/${editForm.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      toast.success("Updated appointment success");
    } else {
      toast.error("Something went wrong");
    }
    setShowEditModal(false);
    fetchAppointments();
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/donate/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      toast.success("Deleted appointment success");
    } else {
      toast.error("Something went wrong");
    }
    setShowDeleteModal(false);
    setDeleteId(null);
    fetchAppointments();
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-200 text-yellow-800 font-semibold rounded px-2 py-1";
      case "approved":
        return "bg-green-200 text-green-800 font-semibold rounded px-2 py-1";
      case "rejected":
        return "bg-red-200 text-red-800 font-semibold rounded px-2 py-1";
      default:
        return "bg-gray-200 text-gray-800 font-semibold rounded px-2 py-1";
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

    

      {/* Appointments Table */}
      <div className="p-4 mt-20">
        <div className="flex justify-between ">
          <div>
            <button
              className="bg-[#F097B9] text-white px-4 py-2 rounded mb-4"
              onClick={() => setShowCreateModal(true)}
            >
              Make Appointment
            </button>
          </div>
          <div>
            <input
              placeholder="Search by Blood Type, Donor Name, or Status"
              className="border border-gray-400 outline-[#F097B9]
               w-[400px] h-[40px] pl-2 rounded-md"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Blood Type</th>
              <th className="p-2">Donor Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Time</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments
              .filter((a) => {
                const term = searchTerm.toLowerCase();
                return (
                  a.bloodType.toLowerCase().includes(term) ||
                  (a.donor_name
                    ? a.donor_name.toLowerCase().includes(term)
                    : "myself".includes(term)) ||
                  (a.status ? a.status.toLowerCase().includes(term) : false)
                );
              })
              .map((a) => (
                <tr key={a.id} className="text-center border-t">
                  <td className="p-2">{a.bloodType}</td>
                  <td className="p-2">{a.donor_name || "Myself"}</td>
                  <td className="p-2">{a.appointmentDate.split("T")[0]}</td>
                  <td className="p-2">{a.location}</td>
                  <td className="p-2">
                    <span className={getStatusClass(a.status)}>{a.status}</span>
                  </td>
                  <td>
                    {formatDistanceToNow(new Date(a.created_at), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => openEditModal(a)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(a.id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-[#F097B9] text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Make Appointment</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <select
                value={form.bloodType}
                onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <input
                type="date"
                value={form.appointmentDate}
                onChange={(e) =>
                  setForm({ ...form, appointmentDate: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />

              {/* IsMe Toggle */}
              <div className="space-x-4">
                <label>
                  <input
                    type="radio"
                    checked={isMe}
                    onChange={() => setIsMe(true)}
                  />
                  <span className="ml-2">Myself</span>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={!isMe}
                    onChange={() => setIsMe(false)}
                  />
                  <span className="ml-2">Friend</span>
                </label>
              </div>

              {!isMe && (
                <input
                  type="text"
                  placeholder="Donor Name"
                  value={form.donorName}
                  onChange={(e) =>
                    setForm({ ...form, donorName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <select
                value={editForm.bloodType}
                onChange={(e) =>
                  setEditForm({ ...editForm, bloodType: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <input
                type="date"
                value={editForm.appointmentDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, appointmentDate: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this appointment?</p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MakeDonor;
