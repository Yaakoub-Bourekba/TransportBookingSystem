import { Router } from 'express';
import {
  markAsPaid,
  markAsUnpaid,
  getAllReservations
} from '../controllers/payment.controller.js';

import { protect, hasRole } from '../middleware/authMiddleware.js';

const router = Router();

// 🧾 Caissier: View and manage reservation payments
router.get('/reservations', protect, hasRole(['caissier']), getAllReservations);
router.put('/:id/paid', protect, hasRole(['caissier']), markAsPaid);
router.put('/:id/unpaid', protect, hasRole(['caissier']), markAsUnpaid);

export default router;