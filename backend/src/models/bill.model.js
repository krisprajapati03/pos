// Bill Model
import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  kotId: { type: mongoose.Schema.Types.ObjectId, ref: "KOT" },
  billNumber: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  date: Date,
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, required: true },
      sellingPrice: { type: Number, required: true },
      total: { type: Number, required: true }
    }
  ],
  totalAmount: Number,
  paymentMode: String,
  tax: Number,
  discount: Number,
  paidAmount: Number,
  // balanceAmount: Number,
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // printCount: Number
}, { timestamps: true });

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
