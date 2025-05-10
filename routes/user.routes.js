import { Router } from 'express';
import {
  activateUser,
  deactivateUser,
  resetPassword,
  searchUsers
} from '../controllers/user.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin-only routes
router.post('/:id/activate', protect, adminOnly, activateUser);        // Activate user
router.post('/:id/deactivate', protect, adminOnly, deactivateUser);    // Deactivate user
router.post('/:id/reset-password', protect, adminOnly, resetPassword); // Reset password
router.get('/search', protect, adminOnly, searchUsers);                // Search users

export default router;
