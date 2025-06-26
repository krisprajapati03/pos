// Expense Category Model
import mongoose from "mongoose";
const expenseCategorySchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  name: String,
  icon: String
}, { timestamps: true });

export const ExpenseCategory = mongoose.model("ExpenseCategory", expenseCategorySchema);