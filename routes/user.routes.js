import { Router } from 'express';
import {
  activateUser,
  deactivateUser,
  resetPassword,
  searchUsers,
  getUpdateUserProfile
} from '../controllers/user.controller.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();

// Admin-only routes
router.post('/:id/activate', protect, adminOnly, activateUser);        // Activate user
router.post('/:id/deactivate', protect,  deactivateUser);    // Deactivate user
router.post('/:id/reset-password', protect, resetPassword); // Reset password
router.get('/admin/:id', protect,  getUpdateUserProfile); // Reset password
router.get('/search', protect, adminOnly, searchUsers);                // Search users

export default router;
