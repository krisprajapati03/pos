import { useState, useEffect, useRef } from "react";
import API from "../../api/axios";
import { FaUtensils, FaLeaf, FaFireAlt, FaPizzaSlice } from "react-icons/fa";

// Icon and color pools
const iconsArr = [
  <FaUtensils className="text-xl text-blue-600" />,
  <FaLeaf className="text-xl text-green-600" />,
  <FaFireAlt className="text-xl text-red-600" />,
  <FaPizzaSlice className="text-xl text-yellow-600" />,
];

const colorsArr = [
  "from-green-400 to-green-600",
  "from-red-400 to-red-600",
  "from-yellow-400 to-yellow-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-indigo-400 to-indigo-600",
  "from-teal-400 to-teal-600",
];

// Helpers to pick random
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  // Persistent maps using useRef
  const iconMap = useRef({});
  const colorMap = useRef({});

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        API.get("/categories"),
        API.get("/product"),
      ]);

      const catList = catRes.data.categories || [];

      // Assign icons and colors once per ID
      catList.forEach((cat) => {
        if (!iconMap.current[cat._id]) {
          iconMap.current[cat._id] = getRandom(iconsArr);
        }
        if (!colorMap.current[cat._id]) {
          colorMap.current[cat._id] = getRandom(colorsArr);
        }
      });

      setCategories(catList);
      setProducts(prodRes.data.products);
    } catch (err) {
      alert("Failed to fetch categories/products");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/categories", form);
      setForm({ name: "", description: "" });
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const getProductCount = (catId) =>
  products.filter((p) =>
    typeof p.category === "string"
      ? p.category === catId
      : p.category?._id === catId
  ).length;
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-4 text-gray-800 flex items-center gap-2">
          <FaUtensils className="text-blue-600 text-xl" /> Manage Categories
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white rounded-xl shadow p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <input
            type="text"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const icon = iconMap.current[cat._id];
            const color = colorMap.current[cat._id];
            const count = getProductCount(cat._id);

            return (
              <div
                key={cat._id}
                className={`rounded-xl shadow-lg p-3 bg-gradient-to-br ${color} text-white flex flex-col justify-between min-h-[140px] hover:scale-105 transition-transform`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white rounded-full p-2 shadow">{icon}</div>
                  <h3 className="text-lg font-bold capitalize">{cat.name}</h3>
                </div>
                <p className="text-xs mb-1 opacity-90">{cat.description}</p>
                <div className="flex justify-between items-end mt-auto text-sm">
                  <span>
                    Products: <strong>{count}</strong>
                  </span>
                  <span>
                    {cat.createdAt &&
                      `Created: ${new Date(cat.createdAt).toLocaleDateString()}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-amber-100 mt-8 p-3 text-center bg-red-500">
          ⚠️ Category update/delete is currently disabled.
        </p>
      </div>
    </div>
  );
}
