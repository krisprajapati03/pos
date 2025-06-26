import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createMoneyOutService,
  getMoneyOutListService,
} from "../services/moneyOut.service.js";

export const createMoneyOut = wrapAsync(async (req, res) => {
  const moneyOut = await createMoneyOutService({ ...req.body, shopId: req.user.shopId });
  res.status(200).json({ message: "Money Out entry created", moneyOut });
});

export const getMoneyOutList = wrapAsync(async (req, res) => {
  const list = await getMoneyOutListService(req.user.shopId);
  res.status(200).json({ moneyOutList: list });
});