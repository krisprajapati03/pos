import { KOT } from "../models/kot.model.js";

export const createKOTDao = async (data) => await KOT.create(data);
export const getKOTByTableDao = async (tableId, shopId) => await KOT.find({ tableId, shopId });
export const updateKOTStatusDao = async (id, status) => await KOT.findByIdAndUpdate(id, { status }, { new: true });
export const getKOTByIdDao = async (kotId, shopId) => await KOT.findOne({ _id: kotId, shopId });
export const getPendingKOTsDao = async (shopId) => await KOT.find({ shopId, status: { $ne: "billed" } })
  .sort({ createdAt: -1 })
  .populate("tableId", "name")
  .populate("orderItems.productId", "name");