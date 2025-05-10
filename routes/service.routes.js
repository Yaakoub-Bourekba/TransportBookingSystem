import { Router } from 'express';
import {
  addService,
  updateService,
  deleteService,
  listServices
} from '../controllers/service.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin-only routes
router.post('/', protect, adminOnly, addService);        // Add new service
router.put('/:id', protect, adminOnly, updateService);   // Edit service
router.delete('/:id', protect, adminOnly, deleteService); // Delete service
router.get('/', protect, adminOnly, listServices);       // View all services

export default router;