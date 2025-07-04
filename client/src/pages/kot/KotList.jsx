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
      const allKots = res.data.kots || [];
      setKots(allKots.filter(k => k.orderItems?.length > 0));
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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (kots.length === 0) {
    return <div className="p-8 text-gray-500 text-center text-lg">No KOTs available.</div>;
  }

  return (
    <div className="p-6 max-full mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        KOT List
      </h1>
      <div className="grid gap-6 sm:grid-cols-4">
        {kots.map((kot) => (
          <div key={kot._id} className="border border-green-100 p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-700 text-lg">KOT #{kot._id.slice(-6)}</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                Table: {kot.tableId?.name || "No name"}
              </span>
            </div>
            {kot.note && (
              <div className="italic text-sm mb-2 text-gray-500">Note: {kot.note}</div>
            )}
            <ul className="mb-3">
              {kot.orderItems.map((item) => (
                <li key={item._id} className="flex justify-between text-sm py-0.5">
                  <span>{item.name}</span>
                  <span className="font-semibold text-gray-700">× {item.qty}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => convertToBill(kot._id)}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold shadow transition-all"
            >
              Convert to Bill
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
