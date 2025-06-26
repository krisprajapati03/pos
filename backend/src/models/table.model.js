// Table Model (for Restaurants)
import mongoose from "mongoose";
const tableSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  tableNumber: String,
  name: String,
  status: { type: String, enum: ["available", "occupied", "reserved"], default: "available" },
  currentBillId: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
}, { timestamps: true });

export const Table = mongoose.model("Table", tableSchema);