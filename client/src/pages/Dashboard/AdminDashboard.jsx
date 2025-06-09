import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/profile/1") // Replace with actual admin ID
      .then(res => res.json())
      .then(data => setAdmin(data));
  }, []);

  return (
   <>
   <div className="">
      <Navbar />
   </div>
       <div>
      
      <h1>Admin Dashboard</h1>
      {admin && <p>Hello Admin: {admin.name}</p>}
    </div>
   </>
  );
}

export default AdminDashboard;
