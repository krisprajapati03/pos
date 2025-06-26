// Category Model
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  name: { type: String, unique: true },
  description: String
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);