import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "cashier",
    phone: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadStaff = async () => {
    const res = await axios.get("/staff");
    setStaffList(res.data.staffList);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updateData = { ...form };
        if (!form.password) delete updateData.password;
        await axios.put(`/staff/${editingId}`, updateData);
        toast.success("Staff updated");
      } else {
        await axios.post("/staff", form);
        toast.success("Staff created");
      }
      setForm({
        name: "",
        role: "cashier",
        phone: "",
        email: "",
        password: "",
        isActive: true,
      });
      setEditingId(null);
      setShowForm(false);
      loadStaff();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleEdit = (staff) => {
    setForm({
      name: staff.name,
      role: staff.role,
      phone: staff.phone,
      email: staff.email || "",
      password: "",
      isActive: staff.isActive ?? true,
    });
    setEditingId(staff._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/staff/${id}`);
    toast.success("Staff deleted");
    loadStaff();
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      name: "",
      role: "cashier",
      phone: "",
      email: "",
      password: "",
      isActive: true,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Manage Staff</h2>
      {/* Show Create Staff button if not editing or creating */}
      {!showForm && !editingId && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
          >
            Create Staff
          </button>
        </div>
      )}

      {/* Slide-down form */}
      {(showForm || editingId) && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow transition-all duration-300 ease-in-out transform -translate-y-4 opacity-100 mb-6"
          style={{ animation: "slideDown 0.3s" }}
        >
          {/* ...form fields as before... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Email ID"
              type="email"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="cashier">Cashier</option>
              <option value="manager">Manager</option>
              <option value="kitchen">Kitchen</option>
              <option value="waiter">Waiter</option>
            </select>
            <input
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              type="password"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength={editingId ? 0 : 6}
              required={!editingId}
              autoComplete="new-password"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
                id="isActive"
                className="h-5 w-5"
              />
              <label htmlFor="isActive" className="text-gray-300 font-medium">
                Active
              </label>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              {editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3 mt-8">
        {staffList.map((s) => (
          <div
            key={s._id}
            className={`border p-4 rounded-lg bg-white flex justify-between items-center shadow ${
              !s.active ? "opacity-60" : ""
            }`}
          >
            <div>
              <div className="font-semibold text-lg text-gray-800">{s.name}</div>
              <div className="text-sm text-gray-600">
                {s.role} - {s.phone}
              </div>
              <div className="text-xs text-gray-500">{s.email}</div>
              <div className="text-xs">
                <span
                  className={`inline-block px-2 py-0.5 rounded ${
                    s.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(s)}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Add this style for slideDown animation */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
