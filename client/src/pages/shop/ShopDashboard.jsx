// ShopDashboard.jsx
import { useState } from "react";
import StaffPage from "../StaffPage";
import EditShop from "../EditShop";

export default function ShopDashboard() {
  const [tab, setTab] = useState("staff");

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Shop Dashboard</h2>
        <button className="block w-full text-left" onClick={() => setTab("staff")}>Manage Staff</button>
        <button className="block w-full text-left" onClick={() => setTab("editShop")}>Edit Shop</button>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {tab === "staff" && <StaffPage />}
        {tab === "editShop" && <EditShop />}
      </main>
    </div>
  );
}