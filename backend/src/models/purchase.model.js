// Purchase Model
import mongoose from "mongoose";
const purchaseSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  invoiceNumber: String,
  date: Date,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  tax: Number
}, { timestamps: true });

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
