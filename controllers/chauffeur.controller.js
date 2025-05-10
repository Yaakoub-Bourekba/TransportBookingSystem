import {
    createChauffeur,
    updateChauffeurById,
    deleteChauffeurById,
    searchChauffeurs
  } from '../models/chauffeur.model.js';
  
  // POST /api/chauffeurs
  export const addDriver = async (req, res) => {
    const { nom, prenom, email, motDePasse } = req.body;
  
    try {
      const result = await createChauffeur(nom, prenom, email, motDePasse);
      res.status(201).json({ message: 'Driver added', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // PUT /api/chauffeurs/:id
  export const updateDriver = async (req, res) => {
    const { nom, prenom } = req.body;
    const id = req.params.id;
  
    try {
      await updateChauffeurById(id, nom, prenom);
      res.json({ message: 'Driver updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // DELETE /api/chauffeurs/:id
  export const deleteDriver = async (req, res) => {
    const id = req.params.id;
  
    try {
      await deleteChauffeurById(id);
      res.json({ message: 'Driver deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // GET /api/chauffeurs/search?nom=Ali
  export const searchDriver = async (req, res) => {
    const { nom } = req.query;
  
    try {
      const results = await searchChauffeurs(nom);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };