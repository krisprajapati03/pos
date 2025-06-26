// src/controllers/shop.controller.js
import {
  createShopService,
  getAllShopsService,
  getShopByIdService,
  updateShopService,
  deleteShopService
} from "../services/shop.service.js";
import wrapAsync from "../utils/tryCatchWapper.js";

export const createShop = wrapAsync(async (req, res) => {
  const shop = await createShopService({ ...req.body, owner: req.user._id });
  res.status(201).json({ message: "Shop created", shop });
});

export const getAllShops = wrapAsync(async (req, res) => {
  const shops = await getAllShopsService();
  res.status(200).json({ shops });
});

export const getShopById = wrapAsync(async (req, res) => {
  const shop = await getShopByIdService(req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.status(200).json({ shop });
});

export const updateShop = wrapAsync(async (req, res) => {
  const shop = await updateShopService(req.params.id, req.body);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.status(200).json({ message: "Shop updated", shop });
});

export const deleteShop = wrapAsync(async (req, res) => {
  const shop = await deleteShopService(req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.status(200).json({ message: "Shop deleted" });
});
