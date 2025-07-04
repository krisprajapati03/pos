import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserDao, findUserByEmailDao, findShopUserByCredentials  } from "../dao/auth.dao.js";


export const registerUser = async ({ name, email, password, plan }) => {
  const existing = await findUserByEmailDao(email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUserDao({ name, email, password: hashedPassword, plan });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmailDao(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};


export const shopLoginService = async ({ shopId, email, password }) => {
  if (!shopId || !email || !password)
    throw new Error("All fields are required");

  const user = await findShopUserByCredentials(shopId, email, password);
  if (!user) throw new Error("Invalid credentials");  

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};