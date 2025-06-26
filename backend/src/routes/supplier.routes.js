    // src/routes/supplier.routes.js
    import express from "express";
    import {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    } from "../controllers/supplier.controller.js";
    import {authMiddleware} from "../middlewares/auth.middleware.js";

    const router = express.Router();

    router.post("/",authMiddleware, createSupplier);
    router.get("/", authMiddleware, getAllSuppliers);
    router.get("/:id", authMiddleware, getSupplierById);
    router.put("/:id", authMiddleware, updateSupplier);
    router.delete("/:id", authMiddleware, deleteSupplier);

    export default router;
