import { useEffect, useState } from "react";
import { createProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

export default function AddProduct() {
  const { user } = useAuth();
  const shopId = user?.shopId || "SHOP";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "pcs",
    purchasePrice: "",
    sellingPrice: "",
    taxRate: "",
    lowStockAlertQty: "",
    imageURL: "",
    isActive: true,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const generatedSku = `${shopId.slice(0, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      const productWithSku = { ...form, sku: generatedSku };

      const res = await createProduct(productWithSku);
      alert(res.data.message || "Product created");

      setForm({
        name: "",
        category: "",
        unit: "pcs",
        purchasePrice: "",
        sellingPrice: "",
        taxRate: "",
        lowStockAlertQty: "",
        imageURL: "",
        isActive: true,
      });

      navigate("/products");
    } catch (err) {
      console.error("Error creating product", err);
      alert("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
            Back
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Unit</label>
              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="Unit (e.g. pcs, kg)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={form.purchasePrice}
                onChange={handleChange}
                placeholder="Purchase Price"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={form.sellingPrice}
                onChange={handleChange}
                placeholder="Selling Price"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={form.taxRate}
                onChange={handleChange}
                placeholder="Tax Rate (%)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Low Stock Alert Qty</label>
              <input
                type="number"
                name="lowStockAlertQty"
                value={form.lowStockAlertQty}
                onChange={handleChange}
                placeholder="Low Stock Alert Qty"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Image URL</label>
              <input
                name="imageURL"
                value={form.imageURL}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span className="text-gray-700">Is Active</span>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
