import { createEstimateDao, getEstimatesDao } from "../dao/estimate.dao.js";

export const createEstimateService = async (data) => {
  return await createEstimateDao(data);
};

export const getEstimateListService = async (shopId) => {
  return await getEstimatesDao(shopId);
};