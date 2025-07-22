import { Router } from 'express';
import {
  addDriver,
  updateDriver,
  searchDriver,
  deleteDriver,
  searchDriverById
} from '../controllers/chauffeur.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin routes
router.post('/', protect, addDriver);             // Add new driver
router.post('/update', updateDriver);   // Update driver info
router.get('/search', protect, adminOnly, searchDriver);     // Search drivers
router.get('/:id', protect, adminOnly, searchDriverById);     // Search drivers
router.delete('/:id', protect, adminOnly, deleteDriver);     // Delete driver

export default router;