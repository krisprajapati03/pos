import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/product";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const navigate = useNavigate();

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.products || []);
  };

  const loadStock = async () => {
    try {
      const res = await axios.get("/stock");
      const transactions = res.data.transactions || [];
      const stockCount = {};
      transactions.forEach((tx) => {
        const id = tx.productId._id;
        const qty = tx.quantity;
        if (!stockCount[id]) stockCount[id] = 0;
        if (tx.type === "purchase") stockCount[id] += qty;
        else if (tx.type === "sale") stockCount[id] -= qty;
      });
      setStockMap(stockCount);
    } catch (err) {
      console.error("Failed to load stock", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete product?")) {
      await deleteProduct(id);
      loadProducts();
      loadStock();
    }
  };

  useEffect(() => {
    loadProducts();
    loadStock();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-blue-700 hover:bg-blue-800 transition text-white px-4 py-2 rounded-lg shadow font-semibold"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="p-3 pl-8 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Stock</th>
              <th className="p-3 text-left font-semibold">Price</th>
              <th className="p-3 text-left font-semibold">Category</th>
              <th className="p-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p._id}
                className={`border-b border-gray-500 ${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="p-2 pl-5 font-medium">{p.name}</td>
                <td className="p-2">
                  <span
                    className={`px-5 py-2 rounded-full text-xs font-bold ${
                      stockMap[p._id] > 0
                        ? "bg-green-100 text-green-700"
                        : stockMap[p._id] === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stockMap[p._id] !== undefined ? stockMap[p._id] : "Loading..."}
                  </span>
                </td>
                <td className="p-2">₹{p.sellingPrice}</td>
                <td className="p-2">{p.category.name}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/products/edit/${p._id}`)}
                    className="bg-green-600 hover:bg-green-700 transition px-3 py-1 text-white rounded-lg shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 hover:bg-red-700 transition px-3 py-1 text-white rounded-lg shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
