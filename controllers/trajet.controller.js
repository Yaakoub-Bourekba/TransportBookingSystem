import {
    getTripsForDriver,
    getAllTripsForUser,
    updateTripStatusById,
    createTrajet,
    updateTrajetById,
    deleteTrajetById,
    searchTrajets,
    getAllMainTripsForUser,
    getTripById
  
  } from '../models/trajet.model.js';
  
  // 🚚 GET /api/trajets/assigned
  export const getAssignedTrips = async (req, res) => {
    try {
      const trips = await getTripsForDriver(req.user.id);
      res.json(trips);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  // Get /api/trajest/search
  export const getAllTrips = async (req, res) => {
  try {
    const { depart: from, destination: to } = req.body;
const data = await getAllTripsForUser(from, to);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  export const getTripsById = async (req, res) => {
    const id = req.params.id;
  try {
const data = await getTripById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  export const getAllMainTrips = async (req, res) => {
  try {
    
const data = await getAllMainTripsForUser();
    console.log(data);
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
  // 🟢 PUT /api/trajets/:id/status
  export const updateTripStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
  
    try {
      await updateTripStatusById(id, status, req.user.id);
      res.json({ message: 'Trip status updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ➕ POST /api/trajets
  export const addTrip = async (req, res) => {
    const { lieuDepart, lieuArrivee } = req.body;
      
    try {
      const result = await createTrajet(lieuDepart, lieuArrivee);
      res.status(201).json({ message: 'Trip created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✏️ PUT /api/trajets/:id
  export const updateTrip = async (req, res) => {
    const { depart, destination } = req.body;
    const { id } = req.params;
  
    try {
      await updateTrajetById(id, depart, destination);
      res.redirect('/admin');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // 🔍 GET /api/trajets/search?destination=X
  export const searchTrips = async (req, res) => {
    const { destination } = req.query;
  
    try {
      const trips = await searchTrajets(destination);
      res.json(trips);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ❌ DELETE /api/trajets/:id
  export const deleteTrip = async (req, res) => {
    try {
      await deleteTrajetById(req.params.id);
      res.json({ message: 'Trip deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };