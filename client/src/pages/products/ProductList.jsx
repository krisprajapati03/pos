import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/product";
import axios from "../../api/axios"; // Your axios instance
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const navigate = useNavigate();

  const loadProducts = async () => {
    const res = await getProducts();
    const productList = res.data.products || [];
    setProducts(productList);
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
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">
                {stockMap[p._id] !== undefined ? stockMap[p._id] : "Loading..."}
              </td>
              <td className="p-2">₹{p.sellingPrice}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => navigate(`/products/edit/${p._id}`)}
                  className="bg-green-500 px-2 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 px-2 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
