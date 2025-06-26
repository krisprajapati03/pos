import { StockTransaction } from "../models/stockTransaction.model.js";

export const createStockTransactionDao = async (data) => {
  return await StockTransaction.create(data);
};

export const getStockTransactionsDao = async (shopId) => {
  return await StockTransaction.find({ shopId })
    .sort({ createdAt: -1 })
    .populate("productId");
};

export const getStockTransactionsByProductDao = async (productId, shopId) => {
  return await StockTransaction.find({ productId, shopId }).sort({ createdAt: -1 });
};

// ✅ New: Get live stock summary (per product)
export const getStockSummaryDao = async (shopId) => {
  return await StockTransaction.aggregate([
    { $match: { shopId } },
    {
      $group: {
        _id: "$productId",
        inQty: {
          $sum: {
            $cond: [{ $in: ["$type", ["purchase", "return"]] }, "$quantity", 0]
          }
        },
        outQty: {
          $sum: {
            $cond: [{ $in: ["$type", ["sale", "adjust"]] }, "$quantity", 0]
          }
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
  ]);
};
