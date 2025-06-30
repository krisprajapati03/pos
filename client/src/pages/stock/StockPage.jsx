import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function StockPage() {
  const [products, setProducts] = useState([]);
  const [stockSummary, setStockSummary] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    type: "purchase",
    quantity: "",
    date: "",
    note: "",
  });

  // Load products and stock summary
  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodRes, stockRes] = await Promise.all([
          axios.get("/product"),
          axios.get("/stock/summary")
        ]);

        const merged = prodRes.data.products.map(p => {
          const stockObj = stockRes.data.stock.find(s => s.productId === p._id);
          return {
            ...p,
            currentStock: stockObj?.currentStock ?? 0
          };
        });

        setProducts(merged);
        setStockSummary(stockRes.data.stock);
      } catch (err) {
        toast.error("Failed to load products or stock");
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/stock", form);
      toast.success("Stock transaction added");

      setForm({ productId: "", type: "purchase", quantity: "", date: "", note: "" });

      // ✅ Re-fetch stock summary to update values after change
      const res = await axios.get("/stock/summary");
      const updated = products.map(p => {
        const stockObj = res.data.stock.find(s => s.productId === p._id);
        return { ...p, currentStock: stockObj?.currentStock ?? 0 };
      });
      setProducts(updated);

      // ✅ Check if the product is low stock
      const product = products.find(p => p._id === form.productId);
      const currentStock = res.data.stock.find(s => s.productId === product._id)?.currentStock ?? 0;
      if (product && currentStock <= product.lowStockAlertQty) {
        toast.warn(`${product.name} is still under low stock (${currentStock})`);
      }

    } catch (err) {
      toast.error("Failed to add stock");
    }
  };

return (
    <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
            <div>
                <label className="block font-medium mb-1">Product</label>
                <select
                    value={form.productId}
                    onChange={(e) => setForm({ ...form, productId: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">-- Select Product --</option>
                    {products.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.name} — Stock: {p.currentStock}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-medium mb-1">Type</label>
                <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border p-2 rounded"
                >
                    <option value="purchase">Purchase</option>
                    <option value="sale">Sale</option>
                    <option value="return">Return</option>
                    <option value="adjust">Adjust</option>
                </select>
            </div>

            <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Date</label>
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Note</label>
                <input
                    type="text"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full border p-2 rounded"
                />
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
                Add Stock
            </button>
        </form>
    </div>
);
}
