// client/src/pages/Donors.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { formatDistanceToNow } from "date-fns";

function Donors() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      const res = await fetch(
        `http://localhost:5000/api/admin/appointment/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        fetchAppointments(); // Refresh data after update
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    const query = searchQuery.toLowerCase();
    const donorName = (appt.donor_name || appt.fullName || "").toLowerCase();
    const bloodType = (appt.bloodType || "").toLowerCase();
    const status = (appt.status || "").toLowerCase();

    return (
      donorName.includes(query) ||
      bloodType.includes(query) ||
      status.includes(query)
    );
  });

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Donors & Appointments</h1>
          <input
            type="search"
            placeholder="Search by Blood Type, Donor Name, or Status"
            className="border border-gray-400 outline-[#F097B9] w-[400px] h-[40px] pl-3 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Appointments Table */}
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Donor Name</th>
              <th className="py-2 px-4 border">Blood Type</th>
              <th className="py-2 px-4 border">Location</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="py-2 px-4 border">
                    {appt.donor_name || appt.fullName}
                  </td>
                  <td className="py-2 px-4 border">{appt.bloodType}</td>
                  <td className="py-2 px-4 border">{appt.location}</td>
                  <td className="py-2 px-4 border">
                    {formatDistanceToNow(new Date(appt.created_at), {
                      addSuffix: true,
                    })}
                  </td>
                  <td
                    className="py-2 px-4 border font-semibold"
                    style={{
                      color:
                        appt.status === "approved"
                          ? "#16a34a"
                          : appt.status === "cancelled"
                          ? "#dc2626"
                          : appt.status === "pending"
                          ? "#ca8a04"
                          : "#374151",
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
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-4 border"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Donors;
