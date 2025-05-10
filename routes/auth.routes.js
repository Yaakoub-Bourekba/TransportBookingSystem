import { Router } from 'express';
import { registerUser, loginUser, getProfile,updateProfile, changePassword } from '../controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/password', protect, changePassword);
router.put('/update', protect, updateProfile);

export default router;