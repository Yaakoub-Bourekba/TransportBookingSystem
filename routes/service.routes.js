import { Router } from 'express';
import {
  addService,
  updateService,
  deleteService,
  listServices,
  specificService,
  serviceFromDriver
} from '../controllers/service.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// 🔍 Find available services on a specific date
// Admin-only routes
router.post('/', protect, adminOnly, addService);        // Add new service
router.post('/:id',updateService);   // Edit service
router.put('/:id',serviceFromDriver);   // Edit service
router.delete('/:id', protect, adminOnly, deleteService); // Delete service
router.get('/', protect, adminOnly, listServices);       // View all services
router.get('/driver/getservice', protect, specificService);       // View all services

export default router;