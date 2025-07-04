import mongoose from "mongoose";

const moneyOutSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    note: String,
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("MoneyOut", moneyOutSchema);
