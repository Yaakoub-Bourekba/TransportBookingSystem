import { Router } from 'express';
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
  markAsPaid,
  markAsUnpaid,
  filterReservationsByDate,
   getReservationsByDateController
} from '../controllers/reservation.controller.js';

import { protect, hasRole } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/by-date', protect, hasRole(['admin', 'passenger']), filterReservationsByDate);
router.post('/by-date', protect, hasRole(['passenger']), getReservationsByDateController);

 

// 👤 Passenger: Make and manage their reservations
router.post('/', protect, hasRole(['passenger']), createReservation);
router.get('/',protect, hasRole(['passenger']), getReservations);
router.put('/:id', protect, hasRole(['passenger']), updateReservation);
router.delete('/:id', protect, hasRole(['passenger']), deleteReservation);

// 💵 Caissier: Payment status management
router.put('/:id/paid', protect, hasRole(['caissier']), markAsPaid);
router.put('/:id/unpaid', protect, hasRole(['caissier']), markAsUnpaid);

export default router;
