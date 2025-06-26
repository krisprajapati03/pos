// Stock Transaction Model
import mongoose from "mongoose";
const stockTransactionSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  type: { type: String, enum: ["purchase", "sale", "return", "adjust"] },
  quantity: Number,
  date: Date,
  note: String
  }, { timestamps: true });

export const StockTransaction = mongoose.model("StockTransaction", stockTransactionSchema);