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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Table Management</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Table Number (e.g., T01)"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 rounded w-48"
        />
        <input
          type="text"
          placeholder="Table Name (e.g., Window)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-48"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tables.map((t) => (
          <div
            key={t._id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <strong>{t.tableNumber}</strong> - {t.name} ({t.status})
            </div>
            <button
              onClick={() => handleDelete(t._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
