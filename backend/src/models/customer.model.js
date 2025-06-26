// // ✅ 1. User Model
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   mobile: String,
//   password: String,
//   role: { type: String, enum: ['admin', 'staff', 'cashier'], default: 'staff' },
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   isActive: { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

// // ✅ 2. Shop Model
// const shopSchema = new mongoose.Schema({
//   name: String,
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   GSTIN: String,
//   address: String,
//   contactNumber: String,
//   logoURL: String,
//   licenseStatus: String,
//   licenseExpiryDate: Date,
//   planType: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Shop', shopSchema);

// // ✅ 3. Product Model
// const productSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   name: String,
//   sku: String,
//   category: String,
//   unit: String,
//   purchasePrice: Number,
//   sellingPrice: Number,
//   taxRate: Number,
//   stockQty: Number,
//   lowStockAlertQty: Number,
//   imageURL: String,
//   isActive: { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);

// // ✅ 4. Stock Transaction Model
// const StockSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   type: { type: String, enum: ['purchase', 'sale', 'return', 'adjust'] },
//   quantity: Number,
//   date: Date,
//   note: String
// }, { timestamps: true });

// module.exports = mongoose.model('Stock', StockSchema);

// // ✅ 5. Customer Model
// const customerSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   name: String,
//   mobile: String,
//   address: String,
//   creditBalance: Number,
//   totalPurchases: Number,
//   lastVisited: Date,
// }, { timestamps: true });

// module.exports = mongoose.model('Customer', customerSchema);

// // ✅ 6. Bill Model
// const billSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   billNumber: String,
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
//   date: Date,
//   products: [
//     {
//       productId: mongoose.Schema.Types.ObjectId,
//       name: String,
//       qty: Number,
//       price: Number,
//       taxRate: Number,
//       discount: Number,
//       total: Number
//     }
//   ],
//   totalAmount: Number,
//   paymentMode: String,
//   paidAmount: Number,
//   balanceAmount: Number,
//   staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   printCount: Number
// }, { timestamps: true });

// module.exports = mongoose.model('Bill', billSchema);

// // ✅ 7. Expense Model
// const expenseSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   title: String,
//   amount: Number,
//   category: String,
//   date: Date,
//   addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   notes: String
// }, { timestamps: true });

// module.exports = mongoose.model('Expense', expenseSchema);

// // ✅ 8. Category Model
// const categorySchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   name: String,
//   description: String
// }, { timestamps: true });

// module.exports = mongoose.model('Category', categorySchema);

// // ✅ 9. Supplier Model
// const supplierSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   name: String,
//   contact: String,
//   address: String,
//   gstNumber: String
// }, { timestamps: true });

// module.exports = mongoose.model('Supplier', supplierSchema);

// // ✅ 10. Purchase Model
// const purchaseSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
//   supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
//   invoiceNumber: String,
//   date: Date,
//   products: [
//     {
//       productId: mongoose.Schema.Types.ObjectId,
//       qty: Number,
//       price: Number
//     }
//   ],
//   totalAmount: Number,
//   tax: Number
// }, { timestamps: true });

// module.exports = mongoose.model('Purchase', purchaseSchema);
// // ✅ 11. Sale Model


// Customer Model
import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  // creditBalance: { type: Number, default: 0 },
  totalPurchases: { type: Number, default: 0 },
  lastVisited: Date,
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
}, { timestamps: true });

export const Customer = mongoose.model("Customer", customerSchema);