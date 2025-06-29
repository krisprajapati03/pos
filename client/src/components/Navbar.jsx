import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white border-b px-4 py-2 flex justify-between items-center shadow-sm">
      <span className="font-bold text-xl">POS App</span>
      <div>
        <span className="mr-4">👤 {user?.name}</span>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  );
}
