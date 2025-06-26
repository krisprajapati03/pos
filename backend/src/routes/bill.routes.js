import express from 'express';
import { createBill, getBillById, getAllBills } from '../controllers/bill.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBill);
router.get('/:id', authMiddleware, getBillById);
router.get('/', authMiddleware, getAllBills);

export default router;
