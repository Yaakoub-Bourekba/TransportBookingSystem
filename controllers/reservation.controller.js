import { log } from 'console';
import {
    createReservationForUser,
    getReservationsForUser,
    updateReservationById,
    deleteReservationById,
    setReservationPaid,
    setReservationUnpaid
  } from '../models/reservation.model.js';
  
  // 🎫 POST /api/reservations (Passenger)
  export const createReservation = async (req, res) => {
    const { trajetId, date, nbrPlaces } = req.body;
  
    try {
      const result = await createReservationForUser(req.user.id, trajetId, date, nbrPlaces);
      res.status(201).json({ message: 'Reservation created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // 📄 GET /api/reservations (Passenger)
  export const getReservations = async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: missing user ID' });
    }
    try {
      const rows = await getReservationsForUser(req.user.id);
      res.json(rows);
      } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✏️ PUT /api/reservations/:id (Passenger)
  export const updateReservation = async (req, res) => {
    const { nbrPlaces } = req.body;
    try {
      await updateReservationById(req.params.id, nbrPlaces, req.user.id);
      res.json({ message: 'Reservation updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ❌ DELETE /api/reservations/:id (Passenger)
  export const deleteReservation = async (req, res) => {
    try {
      await deleteReservationById(req.params.id, req.user.id);
      res.json({ message: 'Reservation deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✅ PUT /api/reservations/:id/paid (Caissier)
  export const markAsPaid = async (req, res) => {
    try {
      await setReservationPaid(req.params.id);
      res.json({ message: 'Reservation marked as paid' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ❌ PUT /api/reservations/:id/unpaid (Caissier)
  export const markAsUnpaid = async (req, res) => {
    try {
      await setReservationUnpaid(req.params.id);
      res.json({ message: 'Reservation marked as unpaid' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };