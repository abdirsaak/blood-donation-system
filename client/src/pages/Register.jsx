import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  gender: "",
  location: "",
  role: "user"
});


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.message === "User registered successfully") {
      toast.success("Registration successful! Please log in.");
       setTimeout(() => {
      navigate("/login");
    }, 3000);
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
         <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          Blood Donation System
        </h1>
          <div className="flex justify-end mb-4 space-x-4 text-sm">
          <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-red-600">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="text-gray-600 hover:text-red-600">
            Register
          </button>
        </div>
       

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Full Name</label>
            <input
              name="fullName"
              type="text"
              required
              className="w-full px-4 py-2 border rounded mt-1"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded mt-1"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded mt-1"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Gender</label>
            <select
              name="gender"
              required
              className="w-full px-4 py-2 border rounded mt-1"
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Location</label>
            <input
              name="location"
              type="text"
              required
              className="w-full px-4 py-2 border rounded mt-1"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Register
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Register;
