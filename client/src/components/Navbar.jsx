import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const dashboardPath =
    role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-red-600">
        <Link to="/">Blood Bank</Link>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex flex-1 justify-center space-x-6">
        {role && (
          <Link to={dashboardPath} className="text-gray-700 hover:text-red-600">
            Dashboard
          </Link>
        )}
        <Link to="/home" className="text-gray-700 hover:text-red-600">Home</Link>
        <Link to="/contact" className="text-gray-700 hover:text-red-600">Contact</Link>

        {role === "user" && (
          <Link to="/make-donor" className="text-gray-700 hover:text-red-600">Make Donor</Link>
        )}
        {role === "admin" && (
          <>
            <Link to="/admin/donors" className="text-gray-700 hover:text-red-600">Donors</Link>
            <Link to="/admin/users" className="text-gray-700 hover:text-red-600">Users</Link>
          </>
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className="hidden md:flex space-x-4">
        {!token ? (
          <>
            <Link to="/register" className="text-gray-700 hover:text-red-600">Register</Link>
            <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? "❌" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col space-y-3 md:hidden z-50">
          {role && (
            <Link to={dashboardPath} onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">
              Dashboard
            </Link>
          )}
          <Link to="/home" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Home</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Contact</Link>

          {role === "user" && (
            <Link to="/make-donor" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Make Donor</Link>
          )}
          {role === "admin" && (
            <>
              <Link to="/admin/donors" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Donors</Link>
              <Link to="/admin/users" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Users</Link>
            </>
          )}

          {!token ? (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Register</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Login</Link>
            </>
          ) : (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-600 hover:underline">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
