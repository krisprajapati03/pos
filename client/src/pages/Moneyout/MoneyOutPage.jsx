import { useState, useEffect } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function MoneyOutPage() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [list, setList] = useState([]);

  const fetchMoneyOut = async () => {
    try {
      const res = await API.get("/moneyout");
      setList(res.data.moneyOutList);
    } catch (err) {
      toast.error("Failed to fetch entries");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/moneyout", { amount, reason, note });
      toast.success("Money Out entry created");
      setAmount("");
      setReason("");
      setNote("");
      fetchMoneyOut();
    } catch (err) {
      toast.error("Failed to create entry");
    }
  };

  useEffect(() => {
    fetchMoneyOut();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Money Out</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full"
        />
        <textarea
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Previous Entries</h3>
      <ul className="space-y-2">
        {list.map((item) => (
          <li key={item._id} className="border p-2 rounded shadow">
            ₹{item.amount} - {item.reason} <br />
            <small className="text-gray-500">{new Date(item.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
