import { createMoneyInDao, getMoneyInListDao } from "../dao/moneyIn.dao.js";

export const createMoneyInService = async (data) => {
  return await createMoneyInDao(data);
};

export const getMoneyInListService = async (shopId) => {
  return await getMoneyInListDao(shopId);
};