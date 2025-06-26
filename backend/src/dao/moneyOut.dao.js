import MoneyOut from "../models/moneyOut.model.js";

export const createMoneyOutDao = async (data) => {
  return await MoneyOut.create(data);
};

export const getMoneyOutListDao = async (shopId) => {
  return await MoneyOut.find({ shopId });
};
