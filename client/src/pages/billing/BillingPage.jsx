import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function BillingPage() {
  const [bills, setBills] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMode, setPaymentMode] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadBills();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bills, paymentMode, startDate, endDate]);

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
      filteredList = filteredList.filter(b => b.paymentMode === paymentMode);
    }

    if (startDate) {
      const from = new Date(startDate);
      filteredList = filteredList.filter(b => new Date(b.date) >= from);
    }

    if (endDate) {
      const to = new Date(endDate);
      filteredList = filteredList.filter(b => new Date(b.date) <= to);
    }

    setFiltered(filteredList);
  };

  const tableWiseCount = {};
  filtered.forEach(bill => {
    const tableName = bill.tableId?.name || "No Table";
    tableWiseCount[tableName] = (tableWiseCount[tableName] || 0) + 1;
  });

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bill List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold">From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">To Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={e => setPaymentMode(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
      </div>

      {/* Table wise customer summary */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">🪑 Table-wise Orders</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(tableWiseCount).map(([table, count]) => (
            <div key={table} className="bg-gray-100 border p-2 rounded">
              <div className="font-semibold">{table}</div>
              <div className="text-sm text-gray-600">{count} Orders</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill List */}
      {filtered.length === 0 ? (
        <div className="text-gray-600">No bills found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((bill) => (
            <div key={bill._id} className="border p-4 rounded shadow bg-white">
              <div className="font-semibold mb-1">
                Bill #{bill.billNumber || bill._id.slice(-6)}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Date: {new Date(bill.createdAt).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Table: {bill.tableId?.name || "No Table"}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Payment Mode: {bill.paymentMode}
              </div>
              <ul className="list-disc pl-4 mb-2">
                {bill.products.map((item, idx) => (
                  <li key={idx}>
                    {item.qty} × ₹{item.sellingPrice} = ₹{item.total}
                  </li>
                ))}
              </ul>
              <div className="font-bold">Total: ₹{bill.totalAmount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
