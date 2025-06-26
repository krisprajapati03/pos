import express from 'express';
import { createBill, getBillById, getAllBills } from '../controllers/bill.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole("admin"), createBill);
router.get('/:id', authMiddleware, getBillById);
router.get('/', authMiddleware, getAllBills);

export default router;
