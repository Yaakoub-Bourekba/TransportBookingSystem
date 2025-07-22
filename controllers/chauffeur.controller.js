import {
    createChauffeur,
    updateChauffeurById,
    deleteChauffeurById,
    searchChauffeurs,
    searchChauffeursById
  } from '../models/chauffeur.model.js';
  
  // POST /api/chauffeurs
  export const addDriver = async (req, res) => {
    const { nom, prenom, email, password,role,numeroPermis } = req.body;
  
    try {
      const result = await createChauffeur(nom, prenom, email, password,role,numeroPermis);
      res.status(201).json({ message: 'Driver added', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // post /api/chauffeurs/:id
  export const updateDriver = async (req, res) => {
    const { idChauffeur,fname, lname,matricule } = req.body;
    
    try {
      await updateChauffeurById(idChauffeur, fname, lname,matricule);
      res.redirect('/admin');
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
    
    try {
      const results = await searchChauffeurs();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  export const searchDriverById = async (req, res) => {
     const {id} = req.params
    try {
      const results = await searchChauffeursById(id);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };