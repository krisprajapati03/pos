import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ShopCreate() {
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    GSTIN: "",
    address: "",
    licenseStatus: "active",
    licenseExpiryDate: "",
    logoURL: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/shops", form);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Shop creation failed");
    }
  };

  // Field labels
  const fieldLabels = {
    name: "Shop Name",
    contactNumber: "Contact Number",
    GSTIN: "GSTIN",
    address: "Address",
    licenseStatus: "License Status",
    licenseExpiryDate: "License Expiry Date",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10M4 10l8 4 8-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Create Shop</h2>
          <p className="text-gray-500 text-sm">Fill in the details to register your shop</p>
        </div>
        {[
          "name",
          "contactNumber",
          "GSTIN",
          "address",
          "licenseStatus",
          "licenseExpiryDate",
        ].map((field) => (
          <div className="mb-5" key={field}>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor={field}>
              {fieldLabels[field] || field}
            </label>
            {field === "licenseStatus" ? (
              <select
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            ) : (
              <input
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={fieldLabels[field] || field}
                type={field.includes("Date") ? "date" : "text"}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-700 hover:to-indigo-700 transition"
        >
          Create Shop
        </button>
      </form>
    </div>
  );
}
