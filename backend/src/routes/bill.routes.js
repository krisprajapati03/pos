import express from 'express';
import { createBill, getBillById, getAllBills } from '../controllers/bill.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole("admin", "cashier", "manager"), createBill);
router.get('/:id', authMiddleware, requireRole("admin", "cashier", "manager"), getBillById);
router.get('/', authMiddleware, requireRole("admin", "cashier", "manager"), getAllBills);

export default router;
