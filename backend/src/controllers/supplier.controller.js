// src/controllers/supplier.controller.js
import {
  createSupplierService,
  getAllSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
  deleteSupplierService,
} from "../services/supplier.service.js";
import wrapAsync from "../utils/tryCatchWapper.js";

export const createSupplier = wrapAsync(async (req, res) => {
  const supplier = await createSupplierService(req.body, req.user.shopId);
  res.status(201).json({ message: "Supplier created", supplier });
});

export const getAllSuppliers = wrapAsync(async (req, res) => {
  const suppliers = await getAllSuppliersService(req.user.shopId);
  res.status(200).json({ suppliers });
});

export const getSupplierById = wrapAsync(async (req, res) => {
  const supplier = await getSupplierByIdService(req.params.id);
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  res.status(200).json({ supplier });
});

export const updateSupplier = wrapAsync(async (req, res) => {
  const supplier = await updateSupplierService(req.params.id, req.body);
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  res.status(200).json({ message: "Supplier updated", supplier });
});

export const deleteSupplier = wrapAsync(async (req, res) => {
  const supplier = await deleteSupplierService(req.params.id);
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  res.status(200).json({ message: "Supplier deleted" });
});
