import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { FaRupeeSign, FaTable, FaMoneyBill, FaQrcode, FaEye, FaEyeSlash } from "react-icons/fa";

export default function BillingPage() {
  const [bills, setBills] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [paymentMode, setPaymentMode] = useState("All");
  const [showSensitive, setShowSensitive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBills();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bills, paymentMode]);

  const loadBills = async () => {
    try {
      const res = await axios.get("/bill");
      setBills(res.data.bills || []);
    } catch (err) {
      toast.error("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredList = [...bills];
    if (paymentMode !== "All") {
      filteredList = filteredList.filter((b) => b.paymentMode === paymentMode);
    }
    setFiltered(filteredList);
  };

  const tableWiseCount = {};
  filtered.forEach((bill) => {
    const tableName = bill.tableId?.name || "No Table";
    tableWiseCount[tableName] = (tableWiseCount[tableName] || 0) + 1;
  });

  const today = new Date().toISOString().split("T")[0];
  const thisMonth = new Date().getMonth();
  const todayRevenue = filtered
    .filter((b) => new Date(b.date).toISOString().split("T")[0] === today)
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const monthlyRevenue = filtered
    .filter((b) => new Date(b.date).getMonth() === thisMonth)
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const cashRevenue = filtered
    .filter((b) => b.paymentMode === "Cash")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const upiRevenue = filtered
    .filter((b) => b.paymentMode === "UPI")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const totalRevenue = filtered.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  if (loading) return <div className="p-8 text-center text-lg font-semibold">Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
          🧾 Bill List
        </h1>
        <button
          onClick={() => setShowSensitive((prev) => !prev)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
        >
          {showSensitive ? <FaEyeSlash /> : <FaEye />} {showSensitive ? "Hide" : "Show"}
        </button>
      </div>

      {/* Summary Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow font-semibold">
          <FaTable className="inline mr-1" /> Tables: {Object.keys(tableWiseCount).length}
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded shadow font-semibold">
          <FaMoneyBill className="inline mr-1" /> Orders: {filtered.length}
        </div>
        {showSensitive && (
          <>
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow font-semibold">
              <FaRupeeSign className="inline mr-1" /> Today: ₹{todayRevenue}
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded shadow font-semibold">
              <FaRupeeSign className="inline mr-1" /> Monthly: ₹{monthlyRevenue}
            </div>
            <div className="bg-green-200 text-green-900 px-4 py-2 rounded shadow font-semibold">
              <FaMoneyBill className="inline mr-1" /> Cash: ₹{cashRevenue}
            </div>
            <div className="bg-blue-200 text-blue-900 px-4 py-2 rounded shadow font-semibold">
              <FaQrcode className="inline mr-1" /> UPI: ₹{upiRevenue}
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded shadow font-semibold">
              <FaRupeeSign className="inline mr-1" /> All Time: ₹{totalRevenue}
            </div>
          </>
        )}
      </div>

      {/* Payment Mode Filter */}
      <div className="mb-6">
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="border border-blue-200 rounded px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="All">All Payments</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      {/* Table-wise Orders */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">🪑 Table-wise Orders</h2>
        <div className="grid grid-cols-10 sm:grid-cols-6 gap-2">
          {Object.entries(tableWiseCount).map(([table, count]) => (
            <div key={table} className="bg-gradient-to-br from-blue-50 to-blue-100 border p-1.5 rounded-lg shadow text-center">
              <div className="font-semibold text-blue-800">{table}</div>
              <div className="text-sm text-blue-600">{count} Orders</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Cards */}
      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No bills found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((bill) => (
            <div key={bill._id} className="border border-blue-100 p-4 rounded-2xl shadow bg-white hover:shadow-lg transition-shadow relative">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-blue-700 text-lg">
                  Bill #{bill.billNumber || bill._id.slice(-6)}
                </div>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold
                  ${bill.paymentMode === "Cash" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                  {bill.paymentMode === "Cash" ? <FaMoneyBill /> : <FaQrcode />}
                  {bill.paymentMode}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-2">{new Date(bill.createdAt).toLocaleString()}</div>
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                  Table: {bill.tableId?.name || "No Table"}
                </span>
              </div>
              <ul className="list-disc pl-5 mb-3 text-sm text-gray-700">
                {bill.products.map((item, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{item.qty} × ₹{item.sellingPrice}</span>
                    <span className="ml-2 text-gray-500">= ₹{item.total}</span>
                  </li>
                ))}
              </ul>
              {(
                <div className="flex justify-end">
                  <span className="font-bold text-lg text-green-700 flex items-center gap-1">
                    <FaRupeeSign /> {bill.totalAmount}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
