import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  // Allow if no role is specified
  if (!role) return children;

  // Handle single or multiple allowed roles
  const allowedRoles = Array.isArray(role) ? role : [role];

  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
}
