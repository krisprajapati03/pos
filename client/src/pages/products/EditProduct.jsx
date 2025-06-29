import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios"; // if you're using axios instance

export default function EditProduct() {
  const { id } = useParams();
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

  useEffect(() => {
    // Fetch product details
    getProduct(id).then((res) => {
      setForm(res.data);
    });

    // Fetch categories
    axios.get("/categories").then((res) => {
      setCategories(res.data.categories || []);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, form);
    alert("Product updated");
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

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

      {/* <input
        name="unit"
        value={form.unit}
        onChange={handleChange}
        placeholder="Unit (e.g. pcs, kg)"
        className="w-full p-2 border mb-2"
      /> */}

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
        placeholder="Low Stock Alert Quantity"
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

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </form>
  );
}
