import {
    getTripsForDriver,
    getAllTripsForUser,
    updateTripStatusById,
    createTrajet,
    updateTrajetById,
    deleteTrajetById,
    searchTrajets
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
    const {from,to,date,time}=req.body
    const data = await getAllTripsForUser(from,to,date,time);
      res.json(data);
  } catch (error) {
    res.json({error:error.message});
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
    const { depart, destination, heureDepart, idChauffeur, idMoyen, idService } = req.body;
  
    try {
      const result = await createTrajet(depart, destination, heureDepart, idChauffeur, idMoyen, idService);
      res.status(201).json({ message: 'Trip created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✏️ PUT /api/trajets/:id
  export const updateTrip = async (req, res) => {
    const { depart, destination, heureDepart } = req.body;
    const { id } = req.params;
  
    try {
      await updateTrajetById(id, depart, destination, heureDepart);
      res.json({ message: 'Trip updated' });
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