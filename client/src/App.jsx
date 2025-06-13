import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import About_us from './pages/About_us';
import Login from './pages/Login';
import How_to_donate from './pages/How_to_danate';
import Request_blood from './pages/Request_blood';
import Donate from './pages/Donate';
import Donors from './pages/Donors';
import Register from './pages/Register';  
import Users from './pages/Users';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Profile from './pages/Profile';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
   
        <Route path="/register" element={<Register />} />
    
        <Route path="/home" element={<HomePage />} />
        <Route path="/about-us" element={<About_us />} />
          <Route path="/how-to-donate" element={<How_to_donate />} />
          <Route path="/Request-blood" element={<Request_blood />} />

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
          path="/donate"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Donate />
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
