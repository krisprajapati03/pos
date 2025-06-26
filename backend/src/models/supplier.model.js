// Supplier Model
import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  name: String,
  contact: String,
  address: String,
  gstNumber: String
}, { timestamps: true });

export const Supplier = mongoose.model("Supplier", supplierSchema);