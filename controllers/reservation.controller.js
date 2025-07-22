import { log } from 'console';
import {
    createReservationForUser,
    getReservationsForUser,
    updateReservationById,
    deleteReservationById,
    setReservationPaid,
    setReservationUnpaid,
    getReservationsByDate,
  } from '../models/reservation.model.js';
  
  // 🎫 POST /api/reservations (Passenger)
 export const createReservation = async (req, res) => {
  const { trajetId, date, nbrPlaces } = req.body;

  try {
    console.log('📥 Reservation attempt:', {
      userId: req.user.id,
      trajetId,
      date,
      nbrPlaces
    });

    const result = await createReservationForUser(req.user.id, trajetId, date, nbrPlaces);

    res.status(201).json({ message: 'Reservation created', id: result.insertId });
  } catch (err) {
    console.error('❌ Reservation creation error:', err); // FULL error log
    res.status(500).json({ error: 'Booking failed' });     // keep this generic for client
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
  const { nbrPlaces, dateReservation } = req.body;
  console.log('🔧 Updating reservation:', {
    id: req.params.id,
    userId: req.user.id,
    nbrPlaces,
    dateReservation
  });

  try {
    await updateReservationById(req.params.id, nbrPlaces, dateReservation, req.user.id);
    res.json({ message: 'Reservation updated' });
  } catch (err) {
    console.error('❌ Update error:', err.message);
    res.status(500).json({ error: 'Update failed' });
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

//
  export const filterReservationsByDate = async (req, res) => {
  const { date } = req.body;

  try {
    const rows = await getReservationsByDate(date);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error filtering reservations:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};
export const getReservationsByDateController = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const reservations = await getReservationsByDate(req.user.id, date);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
