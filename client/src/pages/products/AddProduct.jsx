import { useEffect, useState } from "react";
import { createProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios" // adjust this if you're using a custom axios instance

export default function AddProduct() {
  const { user } = useAuth();
  const shopId = user?.shopId || "SHOP";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    purchasePrice: "",
    sellingPrice: "",
    taxRate: "",
    lowStockAlertQty: "",
    imageURL: "",
    isActive: true,
  });

  const [categories, setCategories] = useState([]);

  // 🔄 Fetch category list on mount
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

      // Reset form
      setForm({
        name: "",
        category: "",
        unit: "",
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
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 border mb-2"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        name="unit"
        value={form.unit}
        onChange={handleChange}
        placeholder="Unit (e.g. pcs, kg)"
        className="w-full p-2 border mb-2"
      />

      <input
        type="number"
        name="purchasePrice"
        value={form.purchasePrice}
        onChange={handleChange}
        placeholder="Purchase Price"
        className="w-full p-2 border mb-2"
      />

      <input
        type="number"
        name="sellingPrice"
        value={form.sellingPrice}
        onChange={handleChange}
        placeholder="Selling Price"
        className="w-full p-2 border mb-2"
      />

      <input
        type="number"
        name="taxRate"
        value={form.taxRate}
        onChange={handleChange}
        placeholder="Tax Rate (%)"
        className="w-full p-2 border mb-2"
      />

      <input
        type="number"
        name="lowStockAlertQty"
        value={form.lowStockAlertQty}
        onChange={handleChange}
        placeholder="Low Stock Alert Qty"
        className="w-full p-2 border mb-2"
      />

      <input
        name="imageURL"
        value={form.imageURL}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 border mb-2"
      />

      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        <span>Is Active</span>
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  );
}
