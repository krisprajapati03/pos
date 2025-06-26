// Product Model
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  unit: String,
  purchasePrice: Number,
  sellingPrice: Number,
  taxRate: Number,
  // stockQty: Number,
  lowStockAlertQty: Number,
  imageURL: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ✅ Compound unique indexes
productSchema.index({ shopId: 1, name: 1 }, { unique: true });
productSchema.index({ shopId: 1, sku: 1 }, { unique: true });

export const Product = mongoose.model("Product", productSchema);
