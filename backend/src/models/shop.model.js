// models/shop.model.js
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contactNumber: { type: String, required: true },
    GSTIN: { type: String },
    address: { type: String, required: true },
    logoURL: { type: String, default: "https://placehold.co/100x100?text=Shop+Logo" },
    licenseStatus: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    licenseExpiryDate: Date,
  },
  { timestamps: true }
);

export const Shop = mongoose.model("Shop", shopSchema);
