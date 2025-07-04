import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { utils, writeFile } from "xlsx";
import { toast } from "react-toastify";

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/reports");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load reports:", err);
      }
    };

    const fetchStock = async () => {
      try {
        const res = await API.get("/stock");
        setTransactions(res.data.transactions);
      } catch (err) {
        toast.error("Failed to load transactions:", err);
      }
    };

    fetchReports();
    fetchStock();
  }, []);

  const exportReportToExcel = () => {
    if (!stats) return;

    const summaryData = [
      { Title: "Today Revenue", Amount: stats.revenue.today },
      { Title: "Monthly Revenue", Amount: stats.revenue.monthly },
      { Title: "Yearly Revenue", Amount: stats.revenue.yearly },
      { Title: "All-Time Revenue", Amount: stats.revenue.allTime },
      { Title: "Cash Payments", Amount: stats.payments.Cash || 0 },
      { Title: "UPI Payments", Amount: stats.payments.UPI || 0 },
      { Title: "Other Payments", Amount: stats.payments.Other || 0 },
      { Title: "Expenses", Amount: stats.expenses },
      { Title: "Money Out", Amount: stats.moneyOut },
    ];

    const monthlyData = stats.monthlyGraph.map((item) => ({
      Month: item.month,
      Sales: item.sales,
      Expenses: item.expenses,
    }));

    const wb = utils.book_new();
    const summarySheet = utils.json_to_sheet(summaryData);
    const monthlySheet = utils.json_to_sheet(monthlyData);
    utils.book_append_sheet(wb, summarySheet, "Summary");
    utils.book_append_sheet(wb, monthlySheet, "Monthly Graph");

    writeFile(wb, `Shop_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  const exportTransactionsToExcel = () => {
    if (transactions.length === 0) return;

    const data = transactions.map((t, index) => ({
      Seq: index + 1,
      Product: t.productId.name,
      Code: t.productId.sku,
      Quantity: t.quantity,
      "Price Unit": t.productId.sellingPrice,
      Discount: 0,
      "Unit Of Measure": t.productId.unit,
      "Sub Total (Discount Deducted)": t.quantity * t.productId.sellingPrice,
      Date: new Date(t.date).toLocaleDateString(),
      Note: t.note,
    }));

    const wb = utils.book_new();
    const sheet = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, sheet, "Sales Transactions");

    writeFile(wb, `Sales_Transactions_${new Date().toLocaleDateString()}.xlsx`);
  };

  if (!stats) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Shop Reports Dashboard</h2>

      {/* ✅ Export Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={exportReportToExcel}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded shadow font-semibold"
        >
          Export Shop Report (Summary)
        </button>
        <button
          onClick={exportTransactionsToExcel}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded shadow font-semibold"
        >
          Export Product Sales Report
        </button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[ 
          { title: "Today Revenue", value: stats.revenue.today },
          { title: "Monthly Revenue", value: stats.revenue.monthly },
          { title: "Yearly Revenue", value: stats.revenue.yearly },
          { title: "All-Time Revenue", value: stats.revenue.allTime },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-xl p-4 border border-gray-100"
          >
            <h4 className="text-gray-500 text-sm">{item.title}</h4>
            <p className="text-xl font-bold">₹ {item.value.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Payment & Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
          <h4 className="font-semibold mb-2">Payment Summary</h4>
          <ul className="space-y-1 text-gray-700">
            <li>Cash: ₹ {stats.payments.Cash || 0}</li>
            <li>UPI: ₹ {stats.payments.UPI || 0}</li>
            <li>Other: ₹ {stats.payments.Other || 0}</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
          <h4 className="font-semibold mb-2">Expenses Summary</h4>
          <ul className="space-y-1 text-gray-700">
            <li>Expenses: ₹ {stats.expenses}</li>
            <li>Money Out: ₹ {stats.moneyOut}</li>
          </ul>
        </div>
      </div>

      {/* Monthly Graph */}
      <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
        <h4 className="font-semibold mb-4">Monthly Sales & Expenses Graph</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyGraph}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#34d399" name="Sales" />
            <Bar dataKey="expenses" fill="#f87171" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
