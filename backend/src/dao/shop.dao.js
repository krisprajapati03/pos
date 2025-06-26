import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactNumber: String,
  GSTIN: String,
  address: String,
  logoURL: String,
  licenseStatus: String,
  licenseExpiryDate: Date,
  planType: { type: String, enum: ["basic","premium"], default: "basic" },
  planExpiry: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Shop = mongoose.model("Shop", shopSchema);
