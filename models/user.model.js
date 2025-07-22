import { exit } from 'process';
import { connection } from '../config/db.js';

export const createUser = async (email, hashedPassword, role,nom,prenom) => {
  const [result] = await connection.execute(
    'INSERT INTO Utilisateur (email, motDePasse, role) VALUES (?, ?, ?)',
    [email, hashedPassword, role]
  );
  const userId = result.insertId; 
  if (role === 'passenger') {
    await connection.execute(
      'INSERT INTO passager ( nom,prenom,idUtilisateur	) VALUES (?, ?,?)',
      [nom, prenom,userId] // Use the correct passenger fields
    );
  }else if(role === 'caissier') {
     await connection.execute(
      'INSERT INTO caissier ( nom,prenom,idUtilisateur	) VALUES (?, ?,?)',
      [nom, prenom,userId] // Use the correct passenger fields
    );
  }
  return result;
};
export const getAllUsers = async()=>{
  const [rows] = await connection.execute('SELECT * FROM utilisateur');
  return rows;
}
export const dashboardUpdates = async()=>{
  const [rows1] = await connection.execute('SELECT COUNT(*) AS totalUsers FROM utilisateur');
  const [rows2] = await connection.execute('SELECT COUNT(*) AS totalDrivers FROM Chauffeur');
  const [rows3] = await connection.execute('SELECT COUNT(*) AS totalVehicles FROM MoyenDeTransport');
  const [rows4] = await connection.execute('SELECT COUNT(*) AS activeServices FROM ServicedeTransport');
  
  const dashBoard = {
    totalUsers: rows1,
    totalDrivers: rows2,
    totalVehicles: rows3,
    activeServices: rows4,
  }
  return dashBoard;
}


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
export const searchUsersByidUtilisateur = async (id) => {
  
  const [rows] = await connection.execute(
   'SELECT idUtilisateur,email, role,etatCompte FROM Utilisateur WHERE idUtilisateur = ?', [id]
  );
  console.log(rows[0]);
  
  return rows;

  
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
//updateProfileByIdUtilisateur
export const updateProfileByIdUtilisateur = async (idUtilisateur, email) => {
  
  // Update Utilisateur table
  await connection.execute(
    'UPDATE Utilisateur SET email = ? WHERE idUtilisateur = ?',
    [email, idUtilisateur]
  );

  return { message: 'User email updated successfully' };
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