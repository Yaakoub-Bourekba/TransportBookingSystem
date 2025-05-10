import bcrypt from 'bcryptjs';
import {
  activateUserById,
  deactivateUserById,
  resetUserPassword,
  searchUsersByEmail
} from '../models/user.model.js';

// ✅ Activate a user account
export const activateUser = async (req, res) => {
  try {
    await activateUserById(req.params.id);
    res.json({ message: 'User activated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🚫 Deactivate a user account
export const deactivateUser = async (req, res) => {
  try {
    await deactivateUserById(req.params.id);
    res.json({ message: 'User deactivated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Reset user password (admin)
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await resetUserPassword(req.params.id, hashed);
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Search for users by email (partial match)
export const searchUsers = async (req, res) => {
  const { email } = req.query;

  try {
    const users = await searchUsersByEmail(email || '');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
