import {
  createKOTDao,
  getKOTByTableDao,
  updateKOTStatusDao,
  getPendingKOTsDao,
  getKOTByIdDao,
  getAllKOTsDao,
  deleteKOTDao
} from "../dao/kot.dao.js";
import { Product } from "../models/product.model.js";
import { createBillService } from "./bill.service.js";

export const createKOTService = async (data, shopId) => {
  return await createKOTDao({ ...data, shopId });
};

export const getKOTByTableService = async (tableId, shopId) => {
  return await getKOTByTableDao(tableId, shopId);
};

export const updateKOTStatusService = async (id, status) => {
  return await updateKOTStatusDao(id, status);
};

export const getPendingKOTsService = async (shopId) => {
  return await getPendingKOTsDao(shopId);
};

export const convertKOTToBillService = async (kotId, shopId, userId) => {
  const kot = await getKOTByIdDao(kotId, shopId);
  if (!kot) throw new Error("KOT not found");

  const products = await Promise.all(kot.orderItems.map(async (item) => {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product not found: ${item.productId}`);

    if (product.currentStock < item.qty) {
      throw new Error(`❌ Insufficient stock for ${product.name}. Available: ${product.currentStock}, Needed: ${item.qty}`);
    }

    const total = product.sellingPrice * item.qty;
    return {
      productId: product._id,
      qty: item.qty,
      sellingPrice: product.sellingPrice,
      total
    };
  }));

  const totalAmount = products.reduce((sum, p) => sum + p.total, 0);

  const billData = {
    shopId,
    kotId: kot._id,
    tableId: kot.tableId || null,
    products,
    totalAmount,
    date: new Date(),
  };

  const bill = await createBillService(billData, userId);

  // Optional: update status first (can skip if deleting)
  await updateKOTStatusDao(kot._id, "billed");

  // ✅ Now delete the KOT
  await deleteKOTDao(kot._id, shopId);

  return bill;
};


export const getAllKOTsService = async (shopId) => {
  return await getAllKOTsDao(shopId);
};
