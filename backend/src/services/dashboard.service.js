import { KOT } from "../models/kot.model.js";
import Bill  from "../models/bill.model.js";
import { StockTransaction } from "../models/stockTransaction.model.js";
import { Product } from "../models/product.model.js";

export const getDashboardSummaryService = async (shopId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [todayKOTs, todayBills, pendingKOTs, stockSummary, products] = await Promise.all([
    KOT.countDocuments({ shopId, createdAt: { $gte: startOfDay } }),
    Bill.find({ shopId, createdAt: { $gte: startOfDay } }),
    KOT.find({ shopId, status: { $ne: "billed" } }).populate("tableId", "name"),
    StockTransaction.aggregate([
      { $match: { shopId } },
      {
        $group: {
          _id: "$productId",
          inQty: {
            $sum: { $cond: [{ $in: ["$type", ["purchase", "return"]] }, "$quantity", 0] }
          },
          outQty: {
            $sum: { $cond: [{ $in: ["$type", ["sale", "adjust"]] }, "$quantity", 0] }
          }
        }
      },
      {
        $project: {
          productId: "$_id",
          currentStock: { $subtract: ["$inQty", "$outQty"] },
          _id: 0
        }
      }
    ]),
    Product.find({ shopId })
  ]);

  const billCount = todayBills.length;
  const totalRevenue = todayBills.reduce((sum, bill) => sum + bill.totalAmount, 0);

  const lowStockProducts = stockSummary
    .filter(p => p.currentStock < 5)
    .map(p => {
      const product = products.find(prod => prod._id.toString() === p.productId.toString());
      return {
        productId: p.productId,
        name: product?.name || "Unknown",
        currentStock: p.currentStock
      };
    });

  return {
    todayKOTCount: todayKOTs,
    todayBillCount: billCount,
    todayRevenue: totalRevenue,
    pendingKOTs,
    lowStockAlerts: lowStockProducts
  };
};
