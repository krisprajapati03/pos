import Bill from "../models/bill.model.js";
import Purchase from "../models/purchase.model.js";
import {Expense} from "../models/expense.model.js";

export const getReportData = async (shopId, start, end) => {
  const sale = await Bill.aggregate([
    { $match: { shopId, date: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: "$total" } } }
  ]);

  const purchase = await Purchase.aggregate([
    { $match: { shopId, date: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: "$total" } } }
  ]);

  const expense = await Expense.aggregate([
    { $match: { shopId, date: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const bills = await Bill.find({ shopId, date: { $gte: start, $lte: end } })
    .select("_id customer total paymentMode createdAt")
    .populate("customer", "name");

  return {
    sale: sale[0]?.total || 0,
    purchase: purchase[0]?.total || 0,
    expense: expense[0]?.total || 0,
    profit: (sale[0]?.total || 0) - (purchase[0]?.total || 0) - (expense[0]?.total || 0),
    bills,
  };
};