import { connection } from '../config/db.js';

// 1. Create a new transport
export const createTransport = async (type, capacite, matricule) => {
  const [result] = await connection.execute(
    'INSERT INTO MoyenDeTransport (type, capacite, matricule) VALUES (?, ?, ?)',
    [type, capacite, matricule]
  );
  return result;
};

// 2. Update an existing transport
export const updateTransportById = async (id, type, capacite, matricule) => {
  await connection.execute(
    'UPDATE MoyenDeTransport SET type = ?, capacite = ?, matricule = ? WHERE idMoyen = ?',
    [type, capacite, matricule, id]
  );
};

// 3. Delete a transport
export const deleteTransportById = async (id) => {
  await connection.execute(
    'DELETE FROM MoyenDeTransport WHERE idMoyen = ?',
    [id]
  );
};

// 4. Search transports by type
export const searchTransports = async (type) => {
  const [rows] = await connection.execute(
    'SELECT * FROM MoyenDeTransport WHERE type LIKE ?',
    [`%${type}%`]
  );
  return rows;
};
