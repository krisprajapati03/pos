import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function KotList() {
  const [kots, setKots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKots();
  }, []);

  const loadKots = async () => {
    try {
      const res = await axios.get("/kot");
      console.log("KOTs loaded:", res.data);
      const allKots = res.data.kots || [];
      setKots(allKots.filter(k => k.orderItems?.length > 0)); // only with items
    } catch (err) {
      toast.error("Failed to load KOTs");
    } finally {
      setLoading(false);
    }
  };

  const convertToBill = async (kotId) => {
    try {
      await axios.post(`/kot/to-bill/${kotId}`);
      toast.success("Bill created successfully");
      loadKots();
    } catch (err) {
      toast.error("Failed to convert KOT");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (kots.length === 0) {
    return <div className="p-4 text-gray-600">No KOTs available.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">KOT List</h1>
      <div className="space-y-4">
        {kots.map((kot) => (
          <div key={kot._id} className="border p-4 rounded shadow bg-white">
            <div className="font-semibold mb-2">KOT #{kot._id.slice(-6)}</div>

            <div className="text-sm text-gray-600 mb-1">
              Table: {kot.tableId?.name || "No name"}
            </div>

            {kot.note && <div className="italic text-sm mb-1">Note: {kot.note}</div>}

            <ul className="list-disc pl-4 mb-2">
              {kot.orderItems.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>

            <button
              onClick={() => convertToBill(kot._id)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Convert to Bill
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
