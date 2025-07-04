// ✅ DAO Layer (src/dao/shop.dao.js)
import { Shop } from "../models/shop.model.js";

export const createShopDao = async (data) => {
    return await Shop.create(data);
};
export const getAllShopsDao = async () => 
    await Shop.find().populate("owner");

export const getShopByIdDao = async (id) => 
    await Shop.findById(id).populate("owner");

export const updateShopDao = async (id, data) => 
    await Shop.findByIdAndUpdate(id, data, { new: true });

export const deleteShopDao = async (id) => 
    await Shop.findByIdAndDelete(id);

export const getShopByOwnerIdDao = async (ownerId) => 
    await Shop.findOne({ owner: ownerId });