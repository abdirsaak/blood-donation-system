import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);
      toast.success(`Login as user ${data.user.role}`);
      setTimeout(() => {
      navigate(
        data.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"
      );
    }, 1500);
    } else {
    toast.error("Email or password wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          Blood Donation System
        </h1>

        {/* Top Right Nav */}
        <div className="flex justify-end mb-4 space-x-4 text-sm">
          <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-red-600">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="text-gray-600 hover:text-red-600">
            Register
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              className="w-full px-4 py-2 border rounded mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              className="w-full px-4 py-2 border rounded mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
