import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function TableManagement() {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [name, setName] = useState("");

  const fetchTables = async () => {
    try {
      const res = await axios.get("/table");
      setTables(res.data.tables);
    } catch (err) {
      toast.error("Failed to fetch tables");
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post("/table", {
        tableNumber,
        name,
        status: "available",
      });
      setTableNumber("");
      setName("");
      toast.success("Table added");
      fetchTables();
    } catch (err) {
      toast.error("Failed to add table");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/table/${id}`);
      toast.success("Table deleted");
      fetchTables();
    } catch (err) {
      toast.error("Failed to delete table");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Table Management</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center">
        <input
          type="text"
          placeholder="Table Number (e.g., T01)"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-60 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="text"
          placeholder="Table Name (e.g., Window)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-60 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleAdd}
          disabled={!tableNumber.trim() || !name.trim()}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-base font-medium transition ${
            (!tableNumber.trim() || !name.trim()) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tables.map((t) => (
          <div
            key={t._id}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-gray-50 hover:shadow transition"
          >
            <div>
              <span className="font-semibold text-lg text-blue-700">{t.tableNumber}</span>
              <span className="mx-2 text-gray-600">-</span>
              <span className="text-gray-800">{t.name}</span>
              <span className={`ml-3 px-2 py-1 rounded text-xs font-medium ${
                t.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {t.status}
              </span>
            </div>
            <button
              onClick={() => handleDelete(t._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
