// client/src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  console.log("Token:", token);
  console.log("Role:", role);
  console.log("Allowed Roles:", allowedRoles);


  return children;
};
