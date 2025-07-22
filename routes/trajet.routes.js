import { Router } from 'express';
import {
  getAssignedTrips,
  getAllTrips,
  updateTripStatus,
  addTrip,
  updateTrip,
  searchTrips,
  deleteTrip,
  getAllMainTrips,
  getTripsById
  
} from '../controllers/trajet.controller.js';

import { protect, hasRole, adminOnly } from '../middleware/authMiddleware.js';



const router = Router();
// use search
router.post('/search',protect,getAllTrips);
// 🚚 Driver: View & update assigned trips
router.get('/assigned', protect, hasRole(['chauffeur','admin']), getAssignedTrips);
router.get('/', protect, hasRole(['chauffeur','admin']), getAllMainTrips);
router.get('/:id', protect, hasRole(['chauffeur','admin']), getTripsById);//getTripsById
router.put('/:id/status', protect, hasRole(['driver']), updateTripStatus);

// 👨‍💼 Admin: Full trip (trajet) management
router.post('/', protect, adminOnly, addTrip);
router.post('/:id',updateTrip);
router.get('/search', protect, searchTrips);
router.delete('/:id', protect, adminOnly, deleteTrip);

export default router;
