import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createStaffService,
  getStaffService,
  updateStaffService,
  deleteStaffService,
} from "../services/staff.service.js";

export const createStaff = wrapAsync(async (req, res) => {
  const staff = await createStaffService({ ...req.body, shopId: req.user.shopId });
  res.status(200).json({ message: "Staff created", staff });
});

export const getStaffList = wrapAsync(async (req, res) => {
  const staffList = await getStaffService(req.user.shopId);
  res.status(200).json({ staffList });
});

export const updateStaff = wrapAsync(async (req, res) => {
  const updated = await updateStaffService(req.params.id, req.body, req.user.shopId);
  res.status(200).json({ message: "Staff updated", updated });
});

export const deleteStaff = wrapAsync(async (req, res) => {
  await deleteStaffService(req.params.id, req.user.shopId);
  res.status(200).json({ message: "Staff deleted" });
});
