import { connection } from '../config/db.js';

// 1. Get assigned trips for a driver
export const getTripsForDriver = async (driverId) => {
  const [rows] = await connection.execute(
    'SELECT * FROM Trajet WHERE idChauffeur = ?',
    [driverId]
  );
  return rows;
};

// 2. Update trip status (by driver)
export const updateTripStatusById = async (trajetId, status, driverId) => {
  await connection.execute(
    'UPDATE Trajet SET statut = ? WHERE idTrajet = ? AND idChauffeur = ?',
    [status, trajetId, driverId]
  );
};

// 3. Create a new trip (by admin)
export const createTrajet = async (depart, destination, heureDepart, idChauffeur, idMoyen, idService) => {
  const [result] = await connection.execute(
    'INSERT INTO Trajet (depart, destination, heureDepart, idChauffeur, idMoyen, idService) VALUES (?, ?, ?, ?, ?, ?)',
    [depart, destination, heureDepart, idChauffeur, idMoyen, idService]
  );
  return result;
};

// 4. Update trip info (by admin)
export const updateTrajetById = async (id, depart, destination, heureDepart) => {
  await connection.execute(
    'UPDATE Trajet SET depart = ?, destination = ?, heureDepart = ? WHERE idTrajet = ?',
    [depart, destination, heureDepart, id]
  );
};

// 5. Delete a trip (by admin)
export const deleteTrajetById = async (id) => {
  await connection.execute(
    'DELETE FROM Trajet WHERE idTrajet = ?',
    [id]
  );
};

// 6. Search trips by destination (by admin)
export const searchTrajets = async (destination) => {
  const [rows] = await connection.execute(
    'SELECT * FROM Trajet WHERE destination LIKE ?',
    [`%${destination}%`]
  );
  return rows;
};
// 7. search fom home all trips for specific date
export const getAllTripsForUser = async (depart, destination, date, heureDepart) => {
  const [data] = await connection.execute(
    'SELECT * FROM Trajet WHERE depart = ? AND destination = ? AND heureDepart = ? AND date = ?',
    [depart, destination, heureDepart, date]
  );
  return data;
};
