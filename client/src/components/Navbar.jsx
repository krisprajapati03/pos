import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white border-b px-4 py-2 flex justify-between items-center shadow-sm">
      {/* Left: App Name */}
      <span className="font-bold text-xl">POS App</span>

      {/* Center: Manage Tables button (only for Admins) */}
      {user?.role === "admin" && (
        <Link
          to="/tables"
          className="bg-blue-600 text-white px-4 py-1 rounded font-medium"
        >
          Manage Tables
        </Link>
      )}

      {/* Right: User Info + Logout */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">👤 {user?.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
