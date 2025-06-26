import mongoose from "mongoose";

const moneyInSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    note: String,
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MoneyIn", moneyInSchema);