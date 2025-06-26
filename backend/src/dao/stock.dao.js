import { StockTransaction } from "../models/stockTransaction.model.js";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

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

export const getLowStockProductsDao = async (shopId, threshold = 5) => {
  const summary = await StockTransaction.aggregate([
    { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
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
        currentStock: { $subtract: ["$inQty", "$outQty"] }
      }
    },
    { $match: { currentStock: { $lt: threshold } } }
  ]);

  const populated = await Product.populate(summary, {
    path: "productId",
    select: "name sellingPrice"
  });

  return populated.map(p => ({
    productId: p.productId._id,
    name: p.productId.name,
    sellingPrice: p.productId.sellingPrice,
    currentStock: p.currentStock
  }));
};
