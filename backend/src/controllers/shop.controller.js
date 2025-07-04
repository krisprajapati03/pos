// ✅ Controller Layer (src/controllers/shop.controller.js)
import {
  getAllShopsService,
  getShopByIdService,
  updateShopService,
  deleteShopService,
  getShopByOwnerIdService,
  createShopService
} from "../services/shop.service.js";
import wrapAsync from "../utils/tryCatchWapper.js";

export const getAllShops = wrapAsync(async (req, res) => {
  const shops = await getAllShopsService();
  res.status(200).json({ success: true, shops });
});

export const getShopById = wrapAsync(async (req, res) => {
  const shop = await getShopByIdService(req.params.id);
  if (!shop) return res.status(404).json({ success: false, message: "Shop not found" });
  res.status(200).json({ success: true, shop });
});

export const updateShop = wrapAsync(async (req, res) => {
  const shop = await updateShopService(req.params.id, req.body);
  if (!shop) return res.status(404).json({ success: false, message: "Shop not found" });
  res.status(200).json({ success: true, message: "Shop updated", shop });
});

export const deleteShop = wrapAsync(async (req, res) => {
  const shop = await deleteShopService(req.params.id);
  if (!shop) return res.status(404).json({ success: false, message: "Shop not found" });
  res.status(200).json({ success: true, message: "Shop deleted" });
});

export const getMyShopController = wrapAsync(async (req, res) => {
  const userId = req.user._id;
  const shop = await getShopByOwnerIdService(userId);
  res.status(200).json({ success: true, shop });
});

export const createShopController = wrapAsync(async (req, res) => {
  const userId = req.user._id;
  const shop = await createShopService(userId, req.body);
  res.status(201).json({ success: true, shop });
});

export const getShopByOwnerIdController = async (req, res) => {
  try {
    const { ownerId } = req.query;

    if (!ownerId) {
      return res.status(400).json({ success: false, message: "Owner ID is required" });
    }

    const shop = await getShopByOwnerIdService(ownerId);

    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }
    return res.status(200).json({ success: true, shop });
  } catch (err) {
    console.error("🛑 Error in /myshop-by-id:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
