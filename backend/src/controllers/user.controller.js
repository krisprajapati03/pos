import { createUserService, getUserByIdService, findUserByEmailService } from "../services/user.service.js";
import wrapAsync from "../utils/tryCatchWapper.js";

export const registerUser = wrapAsync(async (req, res) => {
  const user = await createUserService(req.body);
  res.status(201).json({ message: "User created", user });
});

export const getUser = wrapAsync(async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  res.status(200).json({ user });
});

export const getUserByEmail = wrapAsync(async (req, res) => {
  const user = await findUserByEmailService(req.query.email);
  res.status(200).json({ user });
});
