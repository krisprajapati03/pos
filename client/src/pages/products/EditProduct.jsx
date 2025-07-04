import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [productRes, catRes] = await Promise.all([
        getProduct(id),
        axios.get("/categories"),
      ]);
      setForm(productRes.data);
      setCategories(catRes.data.categories || []);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await updateProduct(id, form);
    setSubmitting(false);
    alert("Product updated");
    navigate("/products");
  };

  const handleBack = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-5 max-w-2xl mx-auto border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
            Edit Product
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
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

          <div>
            <label className="block text-gray-700 font-medium mb-1">Purchase Price</label>
            <input
              type="number"
              name="purchasePrice"
              value={form.purchasePrice}
              onChange={handleChange}
              placeholder="Purchase Price"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Low Stock Alert Quantity</label>
            <input
              type="number"
              name="lowStockAlertQty"
              value={form.lowStockAlertQty}
              onChange={handleChange}
              placeholder="Low Stock Alert Quantity"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input
              name="imageURL"
              value={form.imageURL}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
            {form.imageURL && (
              <img
                src={form.imageURL}
                alt="Product"
                className="mt-3 h-32 object-contain rounded border"
              />
            )}
          </div>
        </div>

        <div className="flex items-center mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="accent-green-600"
            />
            <span className="text-gray-700">Is Active</span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow transition"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
