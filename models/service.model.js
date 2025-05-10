import { connection } from '../config/db.js';

// 1. Create new transport service
export const createService = async (nomService, description) => {
  const [result] = await connection.execute(
    'INSERT INTO ServiceDeTransport (nomService, description) VALUES (?, ?)',
    [nomService, description]
  );
  return result;
};

// 2. Update an existing service
export const updateServiceById = async (id, nomService, description) => {
  await connection.execute(
    'UPDATE ServiceDeTransport SET nomService = ?, description = ? WHERE idService = ?',
    [nomService, description, id]
  );
};

// 3. Delete a service
export const deleteServiceById = async (id) => {
  await connection.execute(
    'DELETE FROM ServiceDeTransport WHERE idService = ?',
    [id]
  );
};

// 4. List all services
export const getAllServices = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM ServiceDeTransport'
  );
  return rows;
};
