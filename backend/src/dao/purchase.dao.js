import Purchase from "../models/purchase.model.js";

export const createPurchaseDao = async (data) => {
  return await Purchase.create(data);
};

export const getAllPurchasesDao = async (shopId) => {
  return await Purchase.find({ shopId }).populate("supplierId").sort({ createdAt: -1 });
};

export const getPurchaseByIdDao = async (id, shopId) => {
  return await Purchase.findOne({ _id: id, shopId }).populate("supplierId");
};
