import bcrypt from 'bcryptjs';
import {
  activateUserById,
  deactivateUserById,
  resetUserPassword,
  searchUsersByEmail,
  searchUsersByidUtilisateur
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
export const getUpdateUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await searchUsersByidUtilisateur(id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateProfile = async (req, res) => {
  const {email,role } = req.body;
  const idUtilisateur = req.user.id

  if (!idUtilisateur  || !role || !email) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const result = await updatePassengerByIdUtilisateur(idUtilisateur,email,role);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.status(200).json({ message: 'Passenger updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const findUserByEmail= async (email) => {
  const [rows] = await connection.execute(
    'SELECT * FROM Utilisateur WHERE email = ?',
    [email]
  );
  return rows[0]; // return user or undefined
};

export const updatePasswordByEmail = async (email, hashedPassword) => {
  const [result] = await connection.execute(
    'UPDATE Utilisateur SET motDePasse = ? WHERE email = ?',
    [hashedPassword, email]
  );
  return result.affectedRows > 0;
};