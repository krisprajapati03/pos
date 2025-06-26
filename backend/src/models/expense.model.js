import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  note: String,
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Expense = mongoose.model("Expense", expenseSchema);
