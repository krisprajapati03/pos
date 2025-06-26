import wrapAsync from "../utils/tryCatchWapper.js";

import {
  createTableService,
  getAllTablesService,
  updateTableStatusService,
  deleteTableService
} from "../services/table.service.js";

export const createTable = wrapAsync(async (req, res) => {
  const table = await createTableService(req.body, req.user.shopId);
  res.status(201).json({ message: "Table created", table });
});

export const getAllTables = wrapAsync(async (req, res) => {
  const tables = await getAllTablesService(req.user.shopId);
  res.status(200).json({ tables });
});

export const updateTableStatus = wrapAsync(async (req, res) => {
  const updated = await updateTableStatusService(req.params.id, req.body);
  res.status(200).json({ message: "Table updated", table: updated });
});

export const deleteTable = wrapAsync(async (req, res) => {
  await deleteTableService(req.params.id);
  res.status(200).json({ message: "Table deleted" });
});
