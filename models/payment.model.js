import { connection } from '../config/db.js';

// 1. View all reservations (for caissier dashboard)
export const getAllReservationsForCashier = async () => {
  const [rows] = await connection.execute(
    'SELECT r.idReservation, r.dateReservation, r.nbrPlaces, r.statutPaiement,' +
    ' p.nom AS passagerNom, p.prenom AS passagerPrenom,' +
    ' t.depart, t.destination, t.heureDepart ' +
    'FROM Reservation r ' +
    'JOIN Passager p ON r.idPassager = p.idPassager ' +
    'JOIN Trajet t ON r.idTrajet = t.idTrajet ' +
    'ORDER BY r.dateReservation DESC'
  );
  return rows;
};

// 2. Mark reservation as paid
export const setReservationPaid = async (reservationId) => {
  await connection.execute(
    'UPDATE Reservation SET statutPaiement = ? WHERE idReservation = ?',
    ['paid', reservationId]
  );
};

// 3. Mark reservation as unpaid
export const setReservationUnpaid = async (reservationId) => {
  await connection.execute(
    'UPDATE Reservation SET statutPaiement = ? WHERE idReservation = ?',
    ['unpaid', reservationId]
  );
};