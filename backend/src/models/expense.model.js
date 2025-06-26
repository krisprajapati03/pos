// src/models/expense.model.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  amount: { type: Number, required: true },
  description: String,
  category: String,
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }
}, { timestamps: true });

export const Expense = mongoose.model("Expense", expenseSchema);
