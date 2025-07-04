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
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
      const res = await axios.get("/stock/summary");
      const updated = products.map(p => {
        const stockObj = res.data.stock.find(s => s.productId === p._id);
        return { ...p, currentStock: stockObj?.currentStock ?? 0 };
      });
      setProducts(updated);
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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold mb-3 text-center text-gray-800">Stock Management</h1>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-md w-full font-bold text-base shadow mb-4"
        >
          Add Stock
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block font-medium mb-1 text-gray-700">Product</label>
              <select
                value={form.productId}
                onChange={(e) => setForm({ ...form, productId: e.target.value })}
                className="w-full border border-gray-300 p-1.5 rounded-md focus:ring-2 focus:ring-green-500"
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
              <label className="block font-semibold mb-1 text-gray-700">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-300 p-1.5 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
                <option value="return">Return</option>
                <option value="adjust">Adjust</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="w-full border border-gray-300 p-1.5 rounded-md focus:ring-2 focus:ring-green-500"
                required
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-300 p-1.5 rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Note</label>
            <input
              type="text"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full border border-gray-300 p-1.5 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Optional note"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-md w-full font-bold text-base shadow"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 transition text-gray-800 px-4 py-2 rounded-md w-full font-bold text-base shadow"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">Current Stock</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Stock</th>
                <th className="py-2 px-4 text-left">Low Stock Alert</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className={p.currentStock <= p.lowStockAlertQty ? "bg-red-50" : ""}>
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4 font-mono">{p.currentStock}</td>
                  <td className="py-2 px-4">{p.lowStockAlertQty}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
