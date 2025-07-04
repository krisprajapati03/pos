import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editNote, setEditNote] = useState("");

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get("/expense");
      setExpenses(data.expenses);
    } catch {
      toast.error("Failed to load expenses");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expense", { amount, note });
      toast.success("Expense added");
      setAmount("");
      setNote("");
      fetchExpenses();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await API.delete(`/expense/${id}`);
      toast.success("Expense deleted");
      fetchExpenses();
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  const startEditing = (exp) => {
    setEditingId(exp._id);
    setEditAmount(exp.amount);
    setEditNote(exp.note);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditAmount("");
    setEditNote("");
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/expense/${editingId}`, {
        amount: editAmount,
        note: editNote,
      });
      toast.success("Expense updated");
      cancelEditing();
      fetchExpenses();
    } catch {
      toast.error("Failed to update expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
        Expenses
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note"
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-3 rounded w-full shadow"
        >
          Add Expense
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Expenses</h2>
        <div className="space-y-3">
          {expenses.length === 0 && (
            <div className="text-gray-500 text-center">No expenses found.</div>
          )}
          {expenses.map((exp) => {
            const dateObj = new Date(exp.createdAt);
            const dateStr = dateObj.toLocaleDateString();
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return editingId === exp._id ? (
              <div key={exp._id} className="bg-yellow-50 p-4 rounded shadow flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="border p-2 rounded w-1/3"
                  />
                  <input
                    type="text"
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white rounded p-2 flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white rounded p-2 flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={exp._id}
                className="flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded shadow-sm"
              >
                <div>
                  <span className="text-lg font-semibold text-blue-700">₹{exp.amount}</span>
                  <span className="ml-3 text-gray-600">{exp.note}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{dateStr} {timeStr}</span>
                  <button
                    onClick={() => startEditing(exp)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
