import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function UserProfileCard() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    address: "",
    profilePicture: ""
  });

  useEffect(() => {
    async function fetchProfile() {
      const res = await axios.get("/auth/profile");
      if (res.status === 200) {
        setUser(res.data.user);
        setForm({
          mobile: res.data.user.mobile || "",
          address: res.data.user.address || "",
          profilePicture: res.data.user.profilePicture || ""
        });
      }
    }
    fetchProfile();
  }, []);

  if (!user) return null;

  const missingFields = !user.mobile || !user.address || !user.profilePicture;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/profile", form); // ✅ use correct route
      setUser({ ...user, ...form }); // ✅ merge updated fields
      setEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mt-12 border border-blue-100">
      <div className="relative">
        <img
          src={user.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || "U"}&backgroundType=gradientLinear&radius=50`}
          alt="user"
          className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-lg object-cover"
        />
        <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow">
          {user.role}
        </span>
      </div>
      <h2 className="mt-5 text-3xl font-extrabold text-gray-800 tracking-tight">{user.name}</h2>
      <p className="text-base text-gray-500 mt-1">{user.email}</p>
      <div className="mt-6 w-full flex flex-col gap-3 text-left">
        <div className="flex items-center gap-2 text-gray-700 text-base">
          <span className="font-semibold w-24">Mobile:</span>
          {user.mobile ? (
            <span>{user.mobile}</span>
          ) : (
            <span className="text-red-500 italic">Not set</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-base">
          <span className="font-semibold w-24">Address:</span>
          {user.address ? (
            <span>{user.address}</span>
          ) : (
            <span className="text-red-500 italic">Not set</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-base">
          <span className="font-semibold w-24">Picture:</span>
          {user.profilePicture ? (
            <span className="text-green-600">Set</span>
          ) : (
            <span className="text-red-500 italic">Not set</span>
          )}
        </div>
      </div>
      {missingFields && !editing && (
        <button
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold shadow"
          onClick={() => setEditing(true)}
        >
          Complete Your Profile
        </button>
      )}
      {editing && (
        <form className="mt-6 w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Mobile</span>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Address</span>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Profile Picture URL</span>
            <input
              type="text"
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <div className="flex gap-3 mt-4 justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-lg font-semibold shadow"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 transition px-5 py-2 rounded-lg font-semibold"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
