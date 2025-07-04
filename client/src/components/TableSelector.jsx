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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-extrabold mb-4 text-purple-700 text-center">Select a Table</h2>
        <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-purple-50">
          {tables.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No tables available</div>
          ) : (
            tables.map(t => (
              <div
                key={t._id}
                onClick={() => setSelected(t)}
                className={`flex items-center justify-between border-2 transition-all duration-150 p-3 rounded-lg cursor-pointer
                  ${selected?._id === t._id
                    ? "border-purple-600 bg-purple-50 shadow"
                    : "border-gray-200 hover:border-purple-400 hover:bg-purple-50"}
                `}
              >
                <div>
                  <span className="font-semibold text-lg">Table {t.tableNumber}</span>
                  <span className="ml-2 text-gray-500">{t.name}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${t.status === "available"
                    ? "bg-green-100 text-green-700"
                    : t.status === "occupied"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"}
                `}>
                  {t.status}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Skip
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
