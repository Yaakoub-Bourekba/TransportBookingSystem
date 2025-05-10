import { connection } from '../config/db.js';

// 1. Create a new reservation for a passenger
export const createReservationForUser = async (userId, trajetId, date, nbrPlaces) => {
  const [result] = await connection.execute(
    `INSERT INTO Reservation (idPassager, idTrajet, dateReservation, nbrPlaces, statutPaiement)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, trajetId, date, nbrPlaces, 'unpaid']
  );
  return result;
};

// 2. Get all reservations for a passenger
export const getReservationsForUser = async (userId) => {
  // Step 1: Find idPassager using the logged-in user's id
  const [passagerRow] = await connection.execute(
    'SELECT idPassager FROM Passager WHERE idUtilisateur = ?',
    [userId]
  );
   
  if (passagerRow.length === 0) {
    throw new Error('Aucun passager trouvé pour cet utilisateur.');
  }

  const idPassager = passagerRow[0].idPassager;

  // Step 2: Get reservations for this passager
  const [rows] = await connection.execute(
    `SELECT r.idReservation, r.dateReservation, r.etat,
            s.heureDepart, s.heureArrivee, s.prix,
            t.lieuDepart, t.lieuArrivee,
            r.statutPaiement
     FROM Reservation r
     JOIN ServiceDeTransport s ON r.idService = s.idService
     JOIN Trajet t ON s.idTrajet = t.idTrajet
     WHERE r.idPassager = ?`,
    [idPassager]
  );

  return rows;
};


// 3. Update a reservation
export const updateReservationById = async (reservationId, nbrPlaces, userId) => {
  await connection.execute(
    `UPDATE Reservation
     SET nbrPlaces = ?
     WHERE idReservation = ? AND idPassager = ?`,
    [nbrPlaces, reservationId, userId]
  );
};

// 4. Delete a reservation
export const deleteReservationById = async (reservationId, userId) => {
  await connection.execute(
    `DELETE FROM Reservation
     WHERE idReservation = ? AND idPassager = ?`,
    [reservationId, userId]
  );
};

// 5. Mark reservation as paid
export const setReservationPaid = async (reservationId) => {
  await connection.execute(
    `UPDATE Reservation
     SET statutPaiement = 'paid'
     WHERE idReservation = ?`,
    [reservationId]
  );
};

// 6. Mark reservation as unpaid
export const setReservationUnpaid = async (reservationId) => {
  await connection.execute(
    `UPDATE Reservation
     SET statutPaiement = 'unpaid'
     WHERE idReservation = ?`,
    [reservationId]
  );
};