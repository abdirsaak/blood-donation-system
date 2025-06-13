import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

function UserDashboard() {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [topAppointments, setTopAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total appointments
        const res1 = await fetch('http://localhost:5000/api/dashboard/total', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data1 = await res1.json();
        setTotalAppointments(data1.totalAppointments || 0);

        // Fetch top 10 appointments
        const res2 = await fetch('http://localhost:5000/api/dashboard/top', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data2 = await res2.json();
        setTopAppointments(data2.topAppointments || []);

        // Optionally fetch user profile
        const res3 = await fetch('http://localhost:5000/api/user/profile/1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data3 = await res3.json();
        setUser(data3.user);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

        {user && (
          <p className="mb-4 text-lg">
            Welcome, <strong>{user.fullName}</strong> ({user.email})
          </p>
        )}

        <div className="bg-blue-100 border-l-4 border-blue-500
         text-blue-700 p-4 rounded shadow mb-6 w-[260px]">
          <p className="font-semibold">📌 Total Appointments: {totalAppointments}</p>
        </div>

        <h2 className="text-xl font-semibold mb-2">Top 10 Appointments</h2>
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Blood Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {topAppointments.map((a, index) => (
              <tr key={a.id} className="text-center border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{a.bloodType}</td>
                <td className="p-2">{a.appointmentDate?.split("T")[0]}</td>
                <td className="p-2">{a.location}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;
