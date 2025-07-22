import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updatePassword,
  updatePassengerByIdUtilisateur,
  updateProfileByIdUtilisateur,
  dashboardUpdates,
  updatePasswordByEmail
} from '../models/user.model.js';
// Register
export const registerUser = async (req, res) => {
  const { email, password, role = 'passenger',nom,prenom } = req.body;
  try {
    const user = await findUserByEmail(email);
    if(!user){
    const hashed = await bcrypt.hash(password, 10);
    await createUser(email, hashed, role,nom,prenom);
     return res.status(201).redirect('/login?message=registration_success')
    }
    return res.redirect('/login?message=already_registered')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  
  try {
    const user = await findUserByEmail(email);
    console.log(user);
    
    if (!user || !(await bcrypt.compare(password, user.motDePasse))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.etatCompte === 0) {
      return res.status(403).json({
        error: 'Your account is not active. Please contact administration.',
      });
    }
    const token = jwt.sign({ id: user.idUtilisateur, role: user.role }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change Profile
export const updateProfile = async (req, res) => {
  const {nom, prenom,email } = req.body;
  const idUtilisateur = req.user.id
  if (!idUtilisateur  || !nom || !prenom || !email) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const result = await updatePassengerByIdUtilisateur(idUtilisateur, nom, prenom, email);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Passenger not found' });
    }

    res.status(200).json({ message: 'Passenger updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Change Profile from admin page
export const updateProfileAdmin = async (req, res) => {
  const {idUtilisateur,email } = req.body;
  if (!idUtilisateur || !email) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const result = await updateProfileByIdUtilisateur(idUtilisateur, email);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Passenger not found'});
    }

    res.status(200).redirect('/admin');
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Change Password
export const changePassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await updatePassword(req.user.id, hashed);
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const lastUpdates = async (req, res) => {
  
  try {
    const result = await dashboardUpdates();
    console.log(result);
    
    res.json(result);
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const resetPasswordByEmail = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const updated = await updatePasswordByEmail(email, hashed);
    if (updated) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};