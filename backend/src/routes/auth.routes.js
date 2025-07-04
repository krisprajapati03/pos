import express from "express";
import { register, login, logout, profile, shopLoginController  } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, profile);
router.post("/shop-login", shopLoginController);

export default router;
