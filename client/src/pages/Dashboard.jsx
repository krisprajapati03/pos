import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/product");
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-500">Role: {user?.role}</p>
      </div>

      {/* Product Grid */}
      <h2 className="text-lg font-semibold mb-2">Best Seller Items</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white border rounded-lg p-2 text-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-20 object-cover rounded mb-1"
            />
            <p className="text-sm font-medium truncate">{product.name}</p>
            <p className="text-green-600 font-semibold text-sm mb-1">
              ₹{product.sellingPrice}
            </p>
            <button className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full w-full">
              +
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t flex justify-between items-center p-3">
        <div className="text-sm">
          Total: ₹0 <span className="ml-2 text-gray-500">(Cash)</span>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 text-sm rounded">
          Save
        </button>
      </div>
    </div>
  );
}
