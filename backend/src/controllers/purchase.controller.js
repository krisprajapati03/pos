import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createPurchaseService,
  getAllPurchasesService,
  getPurchaseByIdService
} from "../services/purchase.service.js";

export const createPurchase = wrapAsync(async (req, res) => {
  const purchase = await createPurchaseService(req.body, req.user.shopId);
  res.status(201).json({ message: "Purchase added", purchase });
});

export const getAllPurchases = wrapAsync(async (req, res) => {
  const purchases = await getAllPurchasesService(req.user.shopId);
  res.status(200).json({ purchases });
});

export const getPurchaseById = wrapAsync(async (req, res) => {
  const purchase = await getPurchaseByIdService(req.params.id, req.user.shopId);
  res.status(200).json({ purchase });
});
