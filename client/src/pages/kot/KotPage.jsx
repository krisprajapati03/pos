import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function KotPage() {
  const [products, setProducts] = useState([]);
  const [table, setTable] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);

  const loadProducts = async () => {
    const res = await API.get("/product");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => setItems([...items, { productId: "", quantity: 1 }]);
  const removeItemRow = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/kot", { table, items });
    alert("KOT created!");
    setTable("");
    setItems([{ productId: "", quantity: 1 }]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create KOT</h2>

      <input
        type="text"
        placeholder="Table No"
        className="w-full p-2 border mb-4"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        required
      />

      {items.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <select
            value={item.productId}
            onChange={(e) => handleItemChange(index, "productId", e.target.value)}
            className="w-1/2 p-2 border"
            required
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            className="w-1/4 p-2 border"
            required
          />
          <button type="button" onClick={() => removeItemRow(index)} className="bg-red-500 text-white px-2">✕</button>
        </div>
      ))}

      <button type="button" onClick={addItemRow} className="bg-blue-500 text-white px-3 py-1 rounded mb-4">+ Add Item</button>
      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Submit KOT</button>
    </form>
  );
}
