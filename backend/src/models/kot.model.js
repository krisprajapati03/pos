import mongoose from "mongoose";

const kotSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  paymentMode: { type: String, enum: ["Cash", "UPI"], default: "Cash" },
  orderItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true }
    }
  ],
  status: {
    type: String,
    enum: ["pending", "printed", "delivered", "billed"],
    default: "pending"
  },
  note: String
}, { timestamps: true });

export const KOT = mongoose.model("KOT", kotSchema);
