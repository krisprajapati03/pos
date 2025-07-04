import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const navItems = [
  { to: "/dashboard", label: "Dashboard", roles: ["admin", "manager", "cashier", "kitchen", "waiter"] },
  { to: "/stock", label: "Stock Summary", roles: ["admin", "manager"] },
  { to: "/kot/list", label: "KOTs", roles: ["admin", "kitchen", "waiter"] },
  { to: "/products", label: "Products", roles: ["admin", "manager"] },
  { to: "/staff", label: "Staff Management", roles: ["admin"] },
  { to: "/expenses", label: "Expenses", roles: ["admin", "manager"] },
  { to: "/billing", label: "Billing", roles: ["admin", "cashier"] },
  { to: "/reports", label: "Reports", roles: ["admin", "manager"] },
  //{ to: "/moneyout", label: "Money Out", roles: ["admin", "manager"] },
];

export default function Sidebar() {
  const { user } = useAuth();
  const [shopName, setShopName] = useState("POS Dashboard");
  const [shopId, setShopId] = useState("");
  const [showShopId, setShowShopId] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await API.get("/shops/myshop");
        if (res.data.shop) {
          setShopName(res.data.shop.name);
          setShopId(res.data.shop._id);
        }
      } catch (err) {
        console.error("Shop fetch error:", err.response?.data?.message || err.message);
      }
    };

    if (user?.role === "admin") fetchShop();
  }, [user]);

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-2 shadow-lg flex flex-col">
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-wide mb-1 p-5 bg-gray-500 rounded-2xl">{shopName}</h2>

        <div className="text-sm px-4 text-gray-400">Role: {user?.role?.toUpperCase()}</div>

        {shopId && (
          <div className="mt-1 px-4 flex items-center justify-between text-xs text-gray-400">
            <span className="truncate">
              {showShopId ? `ID: ${shopId}` : "ID: •••••••••••••"}
            </span>
            <button onClick={() => setShowShopId(!showShopId)} className="ml-2">
              {showShopId ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems
            .filter(item => item.roles.includes(user?.role))
            .map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                      isActive
                        ? "bg-yellow-400 text-gray-900 font-semibold"
                        : "hover:bg-gray-700 hover:text-yellow-400"
                    }`
                  }
                  end
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
}
