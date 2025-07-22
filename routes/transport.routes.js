import { Router } from 'express';
import {
  addTransport,
  updateTransport,
  searchTransport,
  deleteTransport,
  searchTransportAll
} from '../controllers/transport.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin-only routes
router.post('/', protect, adminOnly, addTransport);           // Add a transport
router.post('/:id', updateTransport);      // Update a transport
router.get('/search', protect, adminOnly, searchTransportAll);   // Search transport types
router.get('/search/:id', protect, adminOnly, searchTransport);   // Search transport types
router.delete('/:id', protect, adminOnly, deleteTransport);   // Delete transport

export default router;