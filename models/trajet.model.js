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
export const createTrajet = async (depart, destination) => {
  const [result] = await connection.execute(
    'INSERT INTO Trajet (lieuDepart, lieuArrivee) VALUES (?, ?)',
    [depart, destination]
  );
  return result;
};

// 4. Update trip info (by admin)
export const updateTrajetById = async (id, depart, destination) => {
  await connection.execute(
    'UPDATE Trajet SET lieuDepart = ?, lieuArrivee = ? WHERE idTrajet = ?',
    [depart, destination, id]
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
export const getAllTripsForUser = async (depart, destination) => {
  const [data] = await connection.execute(
    `SELECT 
      t.idTrajet,
      t.lieuDepart AS depart,
      t.lieuArrivee AS destination,
      s.heureDepart,
      s.heureArrivee,
      s.prix,
      s.idService
   FROM Trajet t
   JOIN ServiceDeTransport s ON t.idTrajet = s.idTrajet
   WHERE t.lieuDepart = ? AND t.lieuArrivee = ?`,
    [depart, destination]
  );
  return data;
};
export const getAllMainTripsForUser = async () => {
  const [data] = await connection.execute(
    `SELECT * FROM Trajet`,
  );
  return data;
};
export const getTripById = async (id) => {
  const [data] = await connection.execute(
    `SELECT * FROM Trajet WHERE idtrajet = ?`,
    [id]
  );
  return data;
};


