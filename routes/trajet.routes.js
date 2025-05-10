import { Router } from 'express';
import {
  getAssignedTrips,
  getAllTrips,
  updateTripStatus,
  addTrip,
  updateTrip,
  searchTrips,
  deleteTrip
} from '../controllers/trajet.controller.js';

import { protect, hasRole, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// use search
router.post('/search',getAllTrips);
// 🚚 Driver: View & update assigned trips
router.get('/assigned', protect, hasRole(['driver']), getAssignedTrips);
router.put('/:id/status', protect, hasRole(['driver']), updateTripStatus);

// 👨‍💼 Admin: Full trip (trajet) management
router.post('/', protect, adminOnly, addTrip);
router.put('/:id', protect, adminOnly, updateTrip);
router.get('/search', protect, adminOnly, searchTrips);
router.delete('/:id', protect, adminOnly, deleteTrip);

export default router;
