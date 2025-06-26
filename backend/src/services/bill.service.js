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
import {StockTransaction} from "../models/stockTransaction.model.js";
import {Table} from "../models/table.model.js";
import {createBillDao, getBillByIdDao, getAllBillsDao } from "../dao/bill.dao.js";
import { KOT } from "../models/kot.model.js";

export const createBillService = async (billData, userId) => {
  // 1. Create the bill using DAO
  const bill = await createBillDao({ ...billData, createdBy: userId });

  // 2. For each product, create a "sale" stock transaction
  const stockTransactions = bill.products.map(item => ({
    shopId: bill.shopId,
    productId: item.productId,
    type: "sale",
    quantity: item.qty,
    date: bill.date || new Date(),
    note: `Billed under #${bill.billNumber || bill._id}`
  }));
  await StockTransaction.insertMany(stockTransactions);

  // 3. Optionally, update the table status
  if (bill.tableId) {
    await Table.findByIdAndUpdate(
      bill.tableId,
      { status: "available", currentBillId: null }
    );
  }

  // 4. If the bill is linked to a KOT, update its status
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
