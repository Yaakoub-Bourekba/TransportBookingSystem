import {
    getAllReservationsForCashier,
    setReservationPaid,
    rejectReservation as rejectReservationModel
  } from '../models/payment.model.js';
  
  // 📄 GET /api/payments/reservations
  export const getAllReservations = async (req, res) => {
    try {
      const reservations = await getAllReservationsForCashier();
      console.log(reservations);  
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✅ PUT /api/payments/:id/paid
  export const markAsPaid = async (req, res) => {
    try {
      await setReservationPaid(req.params.id);
      res.json({ message: 'Reservation marked as paid' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ❌ PUT /api/payments/:id/unpaid
export const rejectReservation = async (req, res) => {
  try {
    await rejectReservationModel(req.params.id); 
    res.json({ message: 'Reservation rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
