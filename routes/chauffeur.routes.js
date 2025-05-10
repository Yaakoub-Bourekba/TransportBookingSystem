import { Router } from 'express';
import {
  addDriver,
  updateDriver,
  searchDriver,
  deleteDriver
} from '../controllers/chauffeur.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin routes
router.post('/', protect, adminOnly, addDriver);             // Add new driver
router.put('/:id', protect, adminOnly, updateDriver);        // Update driver info
router.get('/search', protect, adminOnly, searchDriver);     // Search drivers
router.delete('/:id', protect, adminOnly, deleteDriver);     // Delete driver

export default router;