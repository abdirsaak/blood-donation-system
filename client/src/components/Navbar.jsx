import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const dashboardPath =
    role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-red-600">
        <Link to="/">Somali Blood Donation</Link>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex flex-1 justify-center space-x-6">
        {role && (
          <Link to={dashboardPath} className="text-gray-700 hover:text-red-600">
            Dashboard
          </Link>
        )}
        <Link to="/home" className="text-gray-700 hover:text-red-600">Home</Link>
        <Link to="/about-us" className="text-gray-700 hover:text-red-600">About us</Link>
        <Link to="/how-to-donate" className="text-gray-700 hover:text-red-600">How To donate</Link>
       

        {role === "user" && (
          <Link to="/donate" className="text-gray-700 hover:text-red-600">Donate</Link>
        )}
        {role === "admin" && (
          <>
            <Link to="/admin/donors" className="text-gray-700 hover:text-red-600">Donors</Link>
            <Link to="/admin/users" className="text-gray-700 hover:text-red-600">Users</Link>
          </>
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className="hidden md:flex space-x-4 items-center">
        {!token ? (
          <>
            <Link to="/register" className="text-gray-700 hover:text-red-600">Register</Link>
            <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
          </>
        ) : (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)} className="text-2xl text-gray-700 hover:text-red-600">
              <FaUserCircle />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
            <Link to="/donate" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-600">Donate</Link>
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
