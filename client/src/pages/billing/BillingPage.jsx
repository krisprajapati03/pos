import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function BillingPage() {
  const [kots, setKots] = useState([]);
  const [selectedKOT, setSelectedKOT] = useState(null);

  const fetchKOTs = async () => {
    const res = await API.get("/kot");
    setKots(res.data.filter(k => !k.isBilled));
  };

  const selectKOT = async (id) => {
    const res = await API.get(`/kot/${id}`);
    setSelectedKOT(res.data);
  };

  const createBill = async () => {
    await API.post("/billing", {
      kotId: selectedKOT._id,
      table: selectedKOT.table,
      items: selectedKOT.items
    });
    alert("Bill Created");
    setSelectedKOT(null);
    fetchKOTs();
  };

  useEffect(() => {
    fetchKOTs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Billing</h2>

      {!selectedKOT && (
        <ul className="space-y-2">
          {kots.map(kot => (
            <li key={kot._id} className="flex justify-between border p-2 rounded">
              <span>Table: {kot.table} | {kot.items.length} items</span>
              <button onClick={() => selectKOT(kot._id)} className="bg-blue-600 text-white px-3 rounded">Create Bill</button>
            </li>
          ))}
        </ul>
      )}

      {selectedKOT && (
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Bill for Table: {selectedKOT.table}</h3>
          <ul className="mb-4">
            {selectedKOT.items.map((item, idx) => (
              <li key={idx}>🧾 {item.productId?.name} x {item.quantity}</li>
            ))}
          </ul>
          <button onClick={createBill} className="bg-green-600 text-white px-4 py-2 rounded">Confirm & Generate</button>
          <button onClick={() => setSelectedKOT(null)} className="ml-4 text-sm underline text-gray-600">Cancel</button>
        </div>
      )}
    </div>
  );
}
