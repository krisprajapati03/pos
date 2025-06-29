import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function TableSelector({ onSelect, onClose }) {
  const [tables, setTables] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("/table")
      .then(res => setTables(res.data.tables))
      .catch(console.error);
  }, []);

  const handleConfirm = () => {
    onSelect(selected);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow w-full max-w-md p-4">
        <h2 className="text-xl font-bold mb-2">Select a Table</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tables.map(t => (
            <div
              key={t._id}
              onClick={() => setSelected(t)}
              className={`border p-2 rounded cursor-pointer ${selected?._id === t._id ? "bg-blue-100" : ""}`}
            >
              {t.tableNumber} - {t.name} ({t.status})
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-sm px-3 py-1 border rounded">Skip</button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="text-sm px-3 py-1 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
