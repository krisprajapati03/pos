import {
  createKOTDao,
  getKOTByTableDao,
  updateKOTStatusDao,
  getKOTByIdDao,
  getPendingKOTsDao
} from "../dao/kot.dao.js";

export const createKOTService = async (data, shopId) => await createKOTDao({ ...data, shopId });
export const getKOTByTableService = async (tableId, shopId) => await getKOTByTableDao(tableId, shopId);
export const updateKOTStatusService = async (id, status) => await updateKOTStatusDao(id, status);
export const getKOTByIdService = async (kotId, shopId) => await getKOTByIdDao(kotId, shopId);
export const getPendingKOTsService = async (shopId) => await getPendingKOTsDao(shopId);
