// Shop Model
import mongoose from "mongoose";
const shopSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactNumber: { type: String },
  GSTIN: String,
  address: String,
  logoURL: String,
  licenseStatus: String,
  licenseExpiryDate: Date,
  planType: String,
}, { timestamps: true });

export const Shop = mongoose.model("Shop", shopSchema);