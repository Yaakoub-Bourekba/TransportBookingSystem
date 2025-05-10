import { connection } from '../config/db.js';
import bcrypt from 'bcryptjs';

// 1. Create a chauffeur (also creates user in Utilisateur)
export const createChauffeur = async (nom, prenom, email, motDePasse) => {
  const hashedPassword = await bcrypt.hash(motDePasse, 10);

  // Create Utilisateur
  const [userResult] = await connection.execute(
    'INSERT INTO Utilisateur (email, motDePasse, role) VALUES (?, ?, ?)',
    [email, hashedPassword, 'driver']
  );

  const idUtilisateur = userResult.insertId;

  // Create Chauffeur profile
  await connection.execute(
    'INSERT INTO Chauffeur (idChauffeur, nom, prenom) VALUES (?, ?, ?)',
    [idUtilisateur, nom, prenom]
  );

  return userResult;
};

// 2. Update chauffeur info
export const updateChauffeurById = async (id, nom, prenom) => {
  await connection.execute(
    'UPDATE Chauffeur SET nom = ?, prenom = ? WHERE idChauffeur = ?',
    [nom, prenom, id]
  );
};

// 3. Delete chauffeur
export const deleteChauffeurById = async (id) => {
  await connection.execute(
    'DELETE FROM Utilisateur WHERE idUtilisateur = ? AND role = ?',
    [id, 'driver']
  );
};

// 4. Search chauffeurs by name
export const searchChauffeurs = async (nom) => {
  const [rows] = await connection.execute(
    `SELECT c.idChauffeur, c.nom, c.prenom, u.email
     FROM Chauffeur c
     JOIN Utilisateur u ON c.idChauffeur = u.idUtilisateur
     WHERE c.nom LIKE ?`, [`%${nom}%`]
  );
  return rows;
};