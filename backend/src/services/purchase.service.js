import {
  createPurchaseDao,
  getAllPurchasesDao,
  getPurchaseByIdDao
} from "../dao/purchase.dao.js";
import { createStockTransactionDao } from "../dao/stock.dao.js";

export const createPurchaseService = async (data, shopId) => {
  const purchase = await createPurchaseDao({ ...data, shopId });
  // console.log("Purchase created:", data);
  // Update stock transaction for each product
  for (const item of data.products) {
    //console.log("Product ID:", item.productId);
    await createStockTransactionDao({
      shopId,
      productId: item.productId,
      type: "purchase",
      quantity: item.qty,
      date: data.date,
      note: `Purchase invoice: ${data.invoiceNumber}`
    });
  }

  return purchase;
};

export const getAllPurchasesService = async (shopId) => {
  return await getAllPurchasesDao(shopId);
};

export const getPurchaseByIdService = async (id, shopId) => {
  return await getPurchaseByIdDao(id, shopId);
};
