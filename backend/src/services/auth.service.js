import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserDao, findUserByEmailDao } from "../dao/auth.dao.js";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

export const registerUser = async ({ name, email, password }) => {
  const existing = await findUserByEmailDao(email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUserDao({ name, email, password: hashedPassword });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmailDao(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};
