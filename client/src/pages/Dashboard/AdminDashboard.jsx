// client/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/admin/dashboard-stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then(data => setStats(data))
    .catch(err => console.error("Error fetching dashboard stats:", err));
}, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>


        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard label="Total Appointments" value={stats.totalAppointments} />
            <StatCard label="Pending Appointments" value={stats.totalPending} />
            <StatCard label="Approved Appointments" value={stats.totalApproved} />
            <StatCard label="Rejected Appointments" value={stats.totalRejected} />
            <StatCard label="Female Users" value={stats.totalFemaleUsers} />
            <StatCard label="Male Users" value={stats.totalMaleUsers} />
          </div>
        ) : (
          <p>Loading statistics...</p>
        )}
      </div>
    </>
  );
}

// Reusable stat card component
function StatCard({ label, value }) {
  return (
    <div className="bg-white border shadow rounded-lg p-4 text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default AdminDashboard;
