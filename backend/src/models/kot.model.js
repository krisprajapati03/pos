// KOT Model (Kitchen Order Ticket)
import mongoose, { Mongoose } from "mongoose";
const kotSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      qty: Number
    }
  ],
  status: {
    type: String,
    enum: ["pending", "printed", "delivered", "billed"], // added "billed"
    default: "pending"
  },
  note: String
}, { timestamps: true });

export const KOT = mongoose.model("KOT", kotSchema);