import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createKOTService,
  getKOTByTableService,
  updateKOTStatusService,
  getKOTByIdService,
  getPendingKOTsService
} from "../services/kot.service.js";
import { Product } from "../models/product.model.js";
import { createBillService } from "../services/bill.service.js";
import { KOT } from "../models/kot.model.js";

export const createKOT = wrapAsync(async (req, res) => {
  const kot = await createKOTService(req.body, req.user.shopId);
  res.status(201).json({ message: "KOT created", kot });
});

export const getKOTByTable = wrapAsync(async (req, res) => {
  const kot = await getKOTByTableService(req.params.id, req.user.shopId);
  res.status(200).json({ kot });
});

export const updateKOTStatus = wrapAsync(async (req, res) => {
  const kot = await updateKOTStatusService(req.params.id, req.body.status);
  res.status(200).json({ message: "Status updated", kot });
});

export const convertKOTToBill = async (req, res) => {
  try {
    const kotId = req.params.id;
    const shopId = req.user.shopId;
    const userId = req.user._id;

    console.log("➡️ Converting KOT:", kotId, "Shop:", shopId, "User:", userId);

    const kot = await KOT.findOne({ _id: kotId, shopId });
    if (!kot) {
      console.log("❌ KOT not found");
      return res.status(404).json({ message: "KOT not found" });
    }

    const products = await Promise.all(kot.orderItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        console.log("❌ Product not found:", item.productId);
        throw new Error(`Product not found: ${item.productId}`);
      }

      const total = product.sellingPrice * item.qty;
      return {
        productId: product._id,
        qty: item.qty,
        sellingPrice: product.sellingPrice,
        total
      };
    }));

    const totalAmount = products.reduce((sum, p) => sum + p.total, 0);

    const billData = {
      shopId,
      kotId: kot._id,
      tableId: kot.tableId || null,
      products,
      totalAmount,
      date: new Date()
    };

    const bill = await createBillService(billData, userId);

    await KOT.findByIdAndUpdate(kot._id, { status: "billed" });

    return res.status(201).json({ message: "Bill created from KOT", bill });

  } catch (err) {
    console.error("🔥 Error in convertKOTToBill:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const getPendingKOTs = wrapAsync(async (req, res) => {
  const kotList = await getPendingKOTsService(req.user.shopId);
  res.status(200).json({ kot: kotList });
});