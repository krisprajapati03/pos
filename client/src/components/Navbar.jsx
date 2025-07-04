import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const HandlerProfile = async () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 px-8 py-3 flex justify-between items-center shadow-lg">
      {/* Left: App Name */}
      {/* <span className="font-bold text-2xl text-white tracking-wide drop-shadow-lg">
        POS App
      </span> */}

      {/* Center: Admin Actions */}
      {user?.role === "admin" && (
        <div className="flex gap-4">
          <Link
            to="/tables"
            className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold shadow transition hover:bg-blue-600 hover:text-white"
          >
            Manage Tables
          </Link>
          <Link
            to="/categories"
            className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold shadow transition hover:bg-blue-600 hover:text-white"
          >
            Manage Categories
          </Link>
        </div>
      )}

      {/* Right: User Info + Logout */}
      <div className="flex items-center gap-4">
        <span
          className="text-base text-white flex items-center gap-2 cursor-pointer"
          onClick={HandlerProfile}
        >
          <span className="bg-white text-gray-900 rounded-full px-2 py-1 font-bold shadow">👤</span>
          {user?.name}
        </span>
        <button
          onClick={logout}
          className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold shadow transition hover:bg-red-600 hover:text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
