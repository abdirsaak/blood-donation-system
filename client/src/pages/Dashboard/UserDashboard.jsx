import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/profile/2") // Replace with actual user ID
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div>
          <Navbar />
      <h1>User Dashboard</h1>
      {user && <p>Welcome, {user.name} ({user.email})</p>}
    </div>
  );
}

export default UserDashboard;
