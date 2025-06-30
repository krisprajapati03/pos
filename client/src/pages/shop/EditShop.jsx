// EditShop.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function EditShop() {
  const [form, setForm] = useState({ name: "", address: "", contactNumber: "" });

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    const res = await axios.get("/shop/me");
    setForm(res.data.shop);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/shop/update", form);
    toast.success("Shop updated");
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Edit Shop Info</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Shop Name" className="border rounded px-2 py-1 w-full" />
        <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" className="border rounded px-2 py-1 w-full" />
        <input value={form.contactNumber} onChange={e => setForm({ ...form, contactNumber: e.target.value })} placeholder="Phone" className="border rounded px-2 py-1 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
