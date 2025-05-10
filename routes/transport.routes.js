import { Router } from 'express';
import {
  addTransport,
  updateTransport,
  searchTransport,
  deleteTransport
} from '../controllers/transport.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin-only routes
router.post('/', protect, adminOnly, addTransport);           // Add a transport
router.put('/:id', protect, adminOnly, updateTransport);      // Update a transport
router.get('/search', protect, adminOnly, searchTransport);   // Search transport types
router.delete('/:id', protect, adminOnly, deleteTransport);   // Delete transport

export default router;