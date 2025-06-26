import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService
} from "../services/customer.service.js";

export const createCustomer = wrapAsync(async (req, res) => {
  const customer = await createCustomerService(req.body, req.user.shopId);
  res.status(201).json({ message: "Customer created", customer });
});

export const getAllCustomers = wrapAsync(async (req, res) => {
  const customers = await getAllCustomersService(req.user.shopId);
  res.status(200).json({ customers });
});

// export const getCustomerById = wrapAsync(async (req, res) => {
//   const customer = await getCustomerByIdService(req.params.id, req.user.shopId);
//   res.status(200).json({ customer });
// });

export const getCustomerById = wrapAsync(async (req, res) => {
  const customer = await getCustomerByIdService(req.params.id, req.user.shopId);
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }
  res.status(200).json({ customer });
});

// export const updateCustomer = wrapAsync(async (req, res) => {
//   const updated = await updateCustomerService(req.params.id, req.body, req.user.shopId);
//   res.status(200).json({ message: "Customer updated", customer: updated });
// });

export const updateCustomer = wrapAsync(async (req, res) => {
  const updated = await updateCustomerService(req.params.id, req.body, req.user.shopId);
  if (!updated) {
    return res.status(404).json({ error: "Customer not found or not authorized" });
  }
  res.status(200).json({ message: "Customer updated", customer: updated });
});

// export const deleteCustomer = wrapAsync(async (req, res) => {
//   await deleteCustomerService(req.params.id, req.user.shopId);
//   res.status(200).json({ message: "Customer deleted" });
// });

export const deleteCustomer = wrapAsync(async (req, res) => {
  const deleted = await deleteCustomerService(req.params.id, req.user.shopId);
  if (!deleted) {
    return res.status(404).json({ error: "Customer not found or not authorized" });
  }
  res.status(200).json({ message: "Customer deleted" });
});