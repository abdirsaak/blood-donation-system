import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDistanceToNow } from "date-fns";
// imgae
import schdeule from "../assets/images/schedule.png";

function MakeDonor() {
  const [appointments, setAppointments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({ bloodType: "", appointmentDate: "", location: "" });
  const [editForm, setEditForm] = useState({ id: null, bloodType: "", appointmentDate: "", location: "" });
  const [deleteId, setDeleteId] = useState(null);

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
    const res= await fetch("http://localhost:5000/api/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
      if (res.ok) {
      toast.success("Created appointment success");
    } else {
      toast.error("Something went wrong");
    }
    setShowCreateModal(false);
    setForm({ bloodType: "", appointmentDate: "", location: "" });
    fetchAppointments();
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
    const res= await fetch(`http://localhost:5000/api/donate/${editForm.id}`, {
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

  return (
    <>
      <Navbar />
      <ToastContainer />
          <div className="flex flex-col md:flex md:flex-row md:justify-around md:items-center">
                <div className="">
                  <h1 className="text-[25px]">Make Appointment Request Form</h1>
                  <h3 className="text-center">Make your appointments more easier</h3>
                </div>
                <div className="">
                  <img className="h-[300px]" src={schdeule} alt="" />
                </div>

          </div>
      
      {/* .....appointment creation */}
      <div className="p-4">
        <button
          className="bg-[#F097B9] text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowCreateModal(true)}
        >
          Make Appointment
        </button>

        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Blood Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Time</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
         <tbody>
  {appointments.map((a) => (
    <tr key={a.id} className="text-center border-t">
      <td className="p-2">{a.bloodType}</td>
      <td className="p-2">{a.appointmentDate.split("T")[0]}</td>
      <td className="p-2">{a.location}</td>
      <td className="p-2">{a.status}</td>
      <td> {formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}</td>
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
          className="bg-red-500 text-white px-3 py-1 rounded"
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
                onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
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
              <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                <button onClick={() => setShowCreateModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
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
                onChange={(e) => setEditForm({ ...editForm, bloodType: e.target.value })}
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
                onChange={(e) => setEditForm({ ...editForm, appointmentDate: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                <button onClick={() => setShowEditModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this appointment?</p>
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MakeDonor;
