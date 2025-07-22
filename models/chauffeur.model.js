import { connection } from '../config/db.js';
import bcrypt from 'bcryptjs';

// 1. Create a chauffeur (also creates user in Utilisateur)
export const createChauffeur = async (nom, prenom, email, motDePasse,role,numeroPermis) => {
  const hashedPassword = await bcrypt.hash(motDePasse, 10);
  console.log(nom);
  // Create Utilisateur
  const [userResult] = await connection.execute(
    'INSERT INTO Utilisateur (email, motDePasse, role) VALUES (?, ?, ?)',
    [email, hashedPassword, 'chauffeur']
  );
  
  
  const idUtilisateur = userResult.insertId;

  // Create Chauffeur profile
  await connection.execute(
    'INSERT INTO Chauffeur (idUtilisateur, nom, prenom,numeroPermis) VALUES (?, ?, ?,?)',
    [idUtilisateur, nom, prenom,numeroPermis]
  );

  return userResult;
};

// 2. Update chauffeur info
export const updateChauffeurById = async (id, nom, prenom,license) => {
  await connection.execute(
    'UPDATE Chauffeur SET nom = ?, prenom = ?,numeroPermis = ? WHERE idChauffeur = ?',
    [nom, prenom,license, id]
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
export const searchChauffeurs = async () => {
  const [rows] = await connection.execute(
    `SELECT 
      c.idChauffeur, 
      u.idUtilisateur,      -- ✅ Include this
      c.nom, 
      c.prenom, 
      u.email, 
      c.numeroPermis, 
      u.etatCompte
    FROM Chauffeur c
    JOIN Utilisateur u ON c.idUtilisateur = u.idUtilisateur`
  );
  return rows;
};

export const searchChauffeursById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT c.idChauffeur, c.nom, c.prenom, u.email,c.numeroPermis
     FROM Chauffeur c
     JOIN Utilisateur u ON c.idChauffeur = u.idUtilisateur 
     WHERE u.idUtilisateur = ?`,
    [id]
  );
  return rows;
};