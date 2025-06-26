import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createKOTService,
  getKOTByTableService,
  updateKOTStatusService,
  getPendingKOTsService,
  convertKOTToBillService
} from "../services/kot.service.js";

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

export const getPendingKOTs = wrapAsync(async (req, res) => {
  const kot = await getPendingKOTsService(req.user.shopId);
  res.status(200).json({ kot });
});

export const convertKOTToBill = wrapAsync(async (req, res) => {
  const bill = await convertKOTToBillService(req.params.id, req.user.shopId, req.user._id);
  res.status(201).json({ message: "KOT converted to bill", bill });
});
