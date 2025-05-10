import { exit } from 'process';
import { connection } from '../config/db.js';

export const createUser = async (email, hashedPassword, role,nom,prenom) => {
  const [result] = await connection.execute(
    'INSERT INTO Utilisateur (email, motDePasse, role) VALUES (?, ?, ?)',
    [email, hashedPassword, role]
  );
  const userId = result.insertId; 
  console.log(role);
  
  if (role === 'passenger') {
    await connection.execute(
      'INSERT INTO passager ( nom,prenom,idUtilisateur	) VALUES (?, ?,?)',
      [nom, prenom,userId] // Use the correct passenger fields
    );
  }else {
     return 'you are entering wrong credentials';
  }
  return result;
};
export const getAllUsers = async()=>{
  const [rows] = await connection.execute('SELECT * FROM utilisateur');
  return rows;
}

export const findUserByEmail = async (email) => {
  const [rows] = await connection.execute(
    'SELECT * FROM Utilisateur WHERE email = ?', [email]
  );
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await connection.execute(
   `SELECT u.idUtilisateur, u.email, u.role, p.nom, p.prenom
   FROM Utilisateur u
   JOIN Passager p ON u.idUtilisateur = p.idUtilisateur
   WHERE u.idUtilisateur = ?`,
  [id]
  );
  return rows[0];
};
// Update Profile 
export const updatePassengerByIdUtilisateur = async (idUtilisateur, nom, prenom, email) => {
  // Update Passager table
  await connection.execute(
    'UPDATE Passager SET nom = ?, prenom = ? WHERE idUtilisateur = ?',
    [nom, prenom, idUtilisateur]
  );

  // Update Utilisateur table
  await connection.execute(
    'UPDATE Utilisateur SET email = ? WHERE idUtilisateur = ?',
    [email, idUtilisateur]
  );

  return { message: 'Passenger and email updated successfully' };
};


export const updatePassword = async (id, hashedPassword) => {
  await connection.execute(
    'UPDATE Utilisateur SET motDePasse = ? WHERE idUtilisateur = ?',
    [hashedPassword, id]
  );
};
// Activate user
export const activateUserById = async (id) => {
    await connection.execute(
      'UPDATE Utilisateur SET etatCompte = TRUE WHERE idUtilisateur = ?', [id]
    );
  };
  
  // Deactivate user
  export const deactivateUserById = async (id) => {
    await connection.execute(
      'UPDATE Utilisateur SET etatCompte = FALSE WHERE idUtilisateur = ?', [id]
    );
  };
  
  // Reset password (admin)
  export const resetUserPassword = async (id, hashedPassword) => {
    await connection.execute(
      'UPDATE Utilisateur SET motDePasse = ? WHERE idUtilisateur = ?', [hashedPassword, id]
    );
  };
  
  // Search user by email
  export const searchUsersByEmail = async (email) => {
    const [rows] = await connection.execute(
      'SELECT idUtilisateur, email, role, etatCompte FROM Utilisateur WHERE email LIKE ?', [`%${email}%`]
    );
    return rows;
  };