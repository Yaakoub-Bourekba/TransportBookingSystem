import { connection } from '../config/db.js';

// 1. Create a new reservation for a passenger
export const createReservationForUser = async (userId, trajetId, date, nbrPlaces) => {
  // Step 1: Get idPassager from idUtilisateur
  const [rows] = await connection.execute(
    'SELECT idPassager FROM Passager WHERE idUtilisateur = ?',
    [userId]
  );

  if (rows.length === 0) {
    throw new Error('Aucun passager trouvé pour cet utilisateur.');
  }

  const idPassager = rows[0].idPassager;

  // Step 2: Insert reservation with 'en attente' status
  const [result] = await connection.execute(
    `INSERT INTO Reservation (idPassager, idService, dateReservation, nbrPlaces, statutPaiement, etat)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [idPassager, trajetId, date, nbrPlaces, 'unpaid', 'en attente']
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
    `SELECT 
  r.idReservation, 
  r.dateReservation, 
  r.etat,
  r.nbrPlaces, 
  s.heureDepart, 
  s.heureArrivee, 
  s.prix,
  t.lieuDepart, 
  t.lieuArrivee,
  r.statutPaiement
FROM Reservation r
JOIN ServiceDeTransport s ON r.idService = s.idService
JOIN Trajet t ON s.idTrajet = t.idTrajet
WHERE r.idPassager = ?
`,
    [idPassager]
  );

  return rows;
};


// 3. Update a reservation
export const updateReservationById = async (reservationId, nbrPlaces, dateReservation, userId) => {
  await connection.execute(
    `UPDATE Reservation
     SET nbrPlaces = ?, dateReservation = ?
     WHERE idReservation = ? AND idPassager = (
       SELECT idPassager FROM Passager WHERE idUtilisateur = ?
     )`,
    [nbrPlaces, dateReservation, reservationId, userId]
  );
};



// 4. Delete a reservation
export const deleteReservationById = async (reservationId, userId) => {
  await connection.execute(
    `DELETE FROM Reservation
     WHERE idReservation = ?
     AND idPassager = (SELECT idPassager FROM Passager WHERE idUtilisateur = ?)`,
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

export const getServicesAvailableByDate = async (date) => {
  const [rows] = await connection.execute(
    `SELECT s.*, t.lieuDepart, t.lieuArrivee, c.nom AS nomChauffeur, c.prenom AS prenomChauffeur
     FROM ServiceDeTransport s
     JOIN Trajet t ON s.idTrajet = t.idTrajet
     JOIN Chauffeur c ON s.idChauffeur = c.idChauffeur
     WHERE s.idService IN (
       SELECT idService FROM Reservation WHERE dateReservation = ?
     )`,
    [date]
  );
  return rows;
};

export const getReservationsByDate = async (userId, date) => {
  const [passagerRow] = await connection.execute(
    'SELECT idPassager FROM Passager WHERE idUtilisateur = ?',
    [userId]
  );

  if (passagerRow.length === 0) {
    throw new Error('No passenger found for this user');
  }

  const idPassager = passagerRow[0].idPassager;

  const [rows] = await connection.execute(
    `SELECT r.idReservation, r.dateReservation, r.etat,
            s.heureDepart, s.heureArrivee, s.prix,
            t.lieuDepart, t.lieuArrivee,
            r.nbrPlaces, r.statutPaiement
     FROM Reservation r
     JOIN ServiceDeTransport s ON r.idService = s.idService
     JOIN Trajet t ON s.idTrajet = t.idTrajet
     WHERE r.idPassager = ? AND r.dateReservation = ?`,
    [idPassager, date]
  );

  return rows;
};