import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MakeDonor from './pages/MakeDonor';
import Donors from './pages/Donors';
import Register from './pages/Register';  
import Users from './pages/Users';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
   
        <Route path="/register" element={<Register />} />
    
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}

                <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* User-only pages */}
        <Route
          path="/make-donor"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MakeDonor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-only pages */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Donors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
