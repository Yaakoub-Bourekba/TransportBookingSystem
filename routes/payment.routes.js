import { Router } from 'express';
import {
  markAsPaid,
  getAllReservations,
  rejectReservation
} from '../controllers/payment.controller.js';

import { protect, hasRole } from '../middleware/authMiddleware.js';

const router = Router();

// 🧾 Caissier: View and manage reservation payments
router.get('/reservations',  getAllReservations);
router.put('/:id/paid',  markAsPaid);
router.put('/:id/reject',  rejectReservation);
export default router;