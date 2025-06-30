// import { createBillDao, getBillByIdDao, getAllBillsDao } from "../dao/bill.dao.js";
// import mongoose from "mongoose";

// export const createBillService = async (billData, userId) => {
//     return await createBillDao({ ...billData, createdBy: userId });
// };

// // export const getBillByIdService = async (billId) => {
// //     return await getBillByIdDao(billId);
// // };

// export const getAllBillsService = async (userId) => {
//     return await getAllBillsDao(userId);
// };

// export const getBillByIdService = async (billId) => {
//   if (!mongoose.Types.ObjectId.isValid(billId)) {
//     const error = new Error("Invalid bill ID");
//     error.statusCode = 400;
//     throw error;
//   }

//   const bill = await getBillByIdDao(billId);
//   if (!bill) {
//     const error = new Error("Bill not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   return bill;
// };
import mongoose from "mongoose";
import Bill from "../models/bill.model.js";
import { StockTransaction } from "../models/stockTransaction.model.js";
import { Table } from "../models/table.model.js";
import { createBillDao, getBillByIdDao, getAllBillsDao } from "../dao/bill.dao.js";
import { KOT } from "../models/kot.model.js";
import moment from "moment"; // if not installed, use `npm install moment`

export const createBillService = async (billData, userId) => {
  // ✅ Generate Bill Number: yyyymmddNNN
  const today = moment().format("YYYYMMDD");
  const todayStart = moment().startOf("day").toDate();
  const todayEnd = moment().endOf("day").toDate();

  const todayCount = await Bill.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });

  const billNumber = `${today}${String(todayCount + 1).padStart(3, "0")}`; // e.g., 20250629001

  // 1. Create the bill using DAO with generated bill number
  const bill = await createBillDao({ ...billData, createdBy: userId, billNumber });

  // 2. For each product, create a "sale" stock transaction
  const stockTransactions = bill.products.map(item => ({
    shopId: bill.shopId,
    productId: item.productId,
    type: "sale",
    quantity: item.qty,
    date: bill.date || new Date(),
    note: `Billed under #${bill.billNumber}`
  }));
  await StockTransaction.insertMany(stockTransactions);

  // 3. Update the table status to "available"
  if (bill.tableId) {
    await Table.findByIdAndUpdate(
      bill.tableId,
      { status: "available", currentBillId: null }
    );
  }

  // 4. Mark linked KOT as billed
  if (bill.kotId) {
    await KOT.findByIdAndUpdate(bill.kotId, { status: "billed" });
  }

  return bill;
};


export const getAllBillsService = async (shopId) => {
    return await getAllBillsDao(shopId);
};

export const getBillByIdService = async (billId) => {
  if (!mongoose.Types.ObjectId.isValid(billId)) {
    const error = new Error("Invalid bill ID");
    error.statusCode = 400;
    throw error;
  }

  const bill = await getBillByIdDao(billId);
  if (!bill) {
    const error = new Error("Bill not found");
    error.statusCode = 404;
    throw error;
  }

  return bill;
};
