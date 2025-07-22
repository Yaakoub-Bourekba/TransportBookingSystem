import { Router } from 'express';
import { registerUser, loginUser, getProfile,updateProfile,updateProfileAdmin, changePassword,lastUpdates, verifyEmail,resetPasswordByEmail } from '../controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/password', protect, changePassword);
router.put('/update', protect, updateProfile);
router.post('/admin/update', updateProfileAdmin);
router.get('/stats', lastUpdates);
router.post('/verify-email', verifyEmail);
router.put('/reset-password', resetPasswordByEmail);

export default router;