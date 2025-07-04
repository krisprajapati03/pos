import wrapAsync from "../utils/tryCatchWapper.js";
import Bill from "../models/bill.model.js";
import { Expense } from "../models/expense.model.js";
import MoneyOut from "../models/moneyOut.model.js";
import mongoose from "mongoose";

export const getReportSummary = wrapAsync(async (req, res) => {
  const shopId = req.user.shopId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const currentYear = today.getFullYear();

  // ✅ Revenue Calculations
  const todayRevenue = await Bill.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId), createdAt: { $gte: today } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const monthlyRevenue = await Bill.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId), createdAt: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const yearlyRevenue = await Bill.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId), createdAt: { $gte: startOfYear } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const allTimeRevenue = await Bill.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const payments = await Bill.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
    {
      $group: {
        _id: "$paymentMode",
        total: { $sum: "$totalAmount" }
      }
    }
  ]);

  const expenses = await Expense.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const moneyOut = await MoneyOut.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  // ✅ Monthly Graph (Sales + Expenses)
  const salesData = await Bill.aggregate([
    {
      $match: {
        shopId: new mongoose.Types.ObjectId(shopId),
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        totalSales: { $sum: "$totalAmount" }
      }
    }
  ]);

  const expenseData = await Expense.aggregate([
    {
      $match: {
        shopId: new mongoose.Types.ObjectId(shopId),
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        totalExpenses: { $sum: "$amount" }
      }
    }
  ]);

  const monthlyGraph = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const sales = salesData.find(
      (d) => d._id.month === month && d._id.year === currentYear
    );
    const expense = expenseData.find(
      (d) => d._id.month === month && d._id.year === currentYear
    );

    return {
      month: `${new Date(currentYear, month - 1).toLocaleString("default", { month: "short" })} ${currentYear}`,
      sales: sales ? sales.totalSales : 0,
      expenses: expense ? expense.totalExpenses : 0
    };
  });

  // ✅ Final Response
  res.json({
    revenue: {
      today: todayRevenue[0]?.total || 0,
      monthly: monthlyRevenue[0]?.total || 0,
      yearly: yearlyRevenue[0]?.total || 0,
      allTime: allTimeRevenue[0]?.total || 0
    },
    payments: payments.reduce((acc, cur) => {
      acc[cur._id] = cur.total;
      return acc;
    }, {}),
    expenses: expenses[0]?.total || 0,
    moneyOut: moneyOut[0]?.total || 0,
    monthlyGraph
  });
});
