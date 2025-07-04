// ✅ Service Layer (src/services/shop.service.js)
import {
  createShopDao,
  getAllShopsDao,
  getShopByIdDao,
  updateShopDao,
  deleteShopDao,
  getShopByOwnerIdDao
} from "../dao/shop.dao.js";

export const createShopService = async (ownerId, data) => {
  const existing = await getShopByOwnerIdService(ownerId);
  if (existing) throw new Error("Shop already exists");
  return await createShopDao({ ...data, owner: ownerId });
};

export const getAllShopsService = async () => 
  await getAllShopsDao();

export const getShopByIdService = async (id) => 
  await getShopByIdDao(id);

export const updateShopService = async (id, data) => 
  await updateShopDao(id, data);

export const deleteShopService = async (id) => 
  await deleteShopDao(id);

export const getShopByOwnerIdService = async (ownerId) => 
  await getShopByOwnerIdDao(ownerId);
