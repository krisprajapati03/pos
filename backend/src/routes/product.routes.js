import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);


// router.get("/", getAllProducts);
// router.post("/", createProduct);
// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;