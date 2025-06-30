// StaffPage.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({ name: "", role: "cashier", phone: "" });
  const [editingId, setEditingId] = useState(null);

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
        await axios.put(`/staff/${editingId}`, form);
        toast.success("Staff updated");
      } else {
        await axios.post("/staff", form);
        toast.success("Staff created");
      }
      setForm({ name: "", role: "cashier", phone: "" });
      setEditingId(null);
      loadStaff();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleEdit = (staff) => {
    setForm({ name: staff.name, role: staff.role, phone: staff.phone });
    setEditingId(staff._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/staff/${id}`);
    toast.success("Staff deleted");
    loadStaff();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", role: "cashier", phone: "" });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Manage Staff</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border rounded px-2 py-1 w-full" />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="border rounded px-2 py-1 w-full">
          <option value="cashier">Cashier</option>
          <option value="manager">Manager</option>
          <option value="kitchen">Kitchen</option>
          <option value="waiter">Waiter</option>
        </select>
        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="border rounded px-2 py-1 w-full" />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="bg-gray-300 px-4 py-1 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {staffList.map((s) => (
          <div key={s._id} className="border p-2 rounded bg-white flex justify-between items-center">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">{s.role} - {s.phone}</div>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(s)} className="text-blue-600 text-sm">Edit</button>
              <button onClick={() => handleDelete(s._id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
