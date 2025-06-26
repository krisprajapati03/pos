import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createMoneyInService,
  getMoneyInListService,
} from "../services/moneyIn.service.js";

export const createMoneyIn = wrapAsync(async (req, res) => {
  const moneyIn = await createMoneyInService({ ...req.body, shopId: req.user.shopId });
  res.status(200).json({ message: "Money In entry created", moneyIn });
});

export const getMoneyInList = wrapAsync(async (req, res) => {
  const list = await getMoneyInListService(req.user.shopId);
  res.status(200).json({ moneyInList: list });
});