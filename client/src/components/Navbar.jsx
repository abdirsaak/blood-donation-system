import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
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
  
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-red-600">
        <Link to="/">Blood Bank</Link>
      </div>

      {/* Center Nav Links */}
      <div className="space-x-4 flex">
     
      {role && (
          <Link to={dashboardPath} className="text-gray-700 hover:text-red-600">
            Dashboard
          </Link>
        )}
        <Link to="/home" className="text-gray-700 hover:text-red-600">Home</Link>
        <Link to="/contact" className="text-gray-700 hover:text-red-600">Contact</Link>
        

        {/* Conditional Links based on Role */}
        {role === "user" && (
          <Link to="/make-donor" className="text-gray-700 hover:text-red-600">Make Donor</Link>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin/donors" className="text-gray-700 hover:text-red-600">Donors</Link>
            <Link to="/admin/users" className="text-gray-700 hover:text-red-600">Users</Link>
            <Link to="/dashboard/admin" className="text-gray-700 hover:text-red-600">Dashbaord</Link>
          </>
        )}
      </div>

      {/* Right-side Auth Buttons */}
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/register" className="text-gray-700 hover:text-red-600">Register</Link>
            <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
