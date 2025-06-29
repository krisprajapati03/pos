import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;

  return children;
}
