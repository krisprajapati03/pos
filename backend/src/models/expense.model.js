import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({ 
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true }, 
  title: { type: String }, 
  amount: { type: Number }, 
  category: { type: String }, 
  date: { type: Date }, 
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true }, 
  notes: { type: String, default: "" } 
}, 
{ timestamps: true, strict: true });

export default mongoose.model("Expense", expenseSchema);