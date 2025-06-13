// client/src/pages/Donors.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { formatDistanceToNow } from "date-fns"; // Ensure you have date-fns installed

function Donors() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/appointment/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchAppointments(); // Refresh data after update
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Donors & Appointments</h1>

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">blood type</th>
              <th className="py-2 px-4 border">Location</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="py-2 px-4 border">{appt.fullName}</td>
                    <td className="py-2 px-4 border">{appt.bloodType}</td>
                      <td className="py-2 px-4 border">{appt.location}</td>
               <td> {formatDistanceToNow(new Date(appt.created_at), { addSuffix: true })}</td>
                <td
                  className="py-2 px-4 border font-semibold"
                  style={{
                    color:
                      appt.status === "approved" ? "#16a34a" : // green-600 (Tailwind)
                      appt.status === "cancelled" ? "#dc2626" : // red-600
                      appt.status === "pending" ? "#ca8a04" :   // yellow-600
                      "#374151", // default gray-700
                  }}
                >
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => updateStatus(appt.id, "approved")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(appt.id, "rejected")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                  reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Donors;
