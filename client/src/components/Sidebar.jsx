import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">POS Dashboard</h2>
      <Link to="/dashboard" className="block hover:text-yellow-400">Dashboard</Link>

      {user?.role === "admin" && (
        <>
          <Link to="/products" className="block hover:text-yellow-400">Products</Link>
          <Link to="/orders" className="block hover:text-yellow-400">Orders</Link>
        </>
      )}

      {user?.role === "staff" && (
        <>
          <Link to="/kot" className="block hover:text-yellow-400">Create KOT</Link>
        </>
      )}

      <Link to="/billing" className="block hover:text-yellow-400">Billing</Link>
    </div>
  );
}
