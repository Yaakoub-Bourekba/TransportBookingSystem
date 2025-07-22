import {
    createService,
    updateServiceById,
    deleteServiceById,
    getAllServices,
    getSpecificService,
    updateServiceByIdFromDriver
  } from '../models/service.model.js';
  
  // POST /api/services
  export const addService = async (req, res) => {
    const { idTrajet, heureDepart,heureArrivee,dateService,idChauffeur,idMoyen,prix } = req.body;
  
    try {
      const result = await createService(idTrajet, heureDepart,heureArrivee,dateService,idChauffeur,idMoyen,prix);
      res.status(201).json({ message: 'Service created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // post /api/services/:id
  export const updateService = async (req, res) => {
    const { hdepart,harrivee,prix,dservice } = req.body;
    const { id } = req.params;
    
    try {
      await updateServiceById(id, hdepart, harrivee,prix,dservice);
      res.redirect('/admin');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // DELETE /api/services/:id
  export const deleteService = async (req, res) => {
    const { id } = req.params;
  
    try {
      await deleteServiceById(id);
      res.json({ message: 'Service deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // GET /api/services
  export const listServices = async (req, res) => {
    try {
      const services = await getAllServices();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  // GET /api/services/:id
  export const specificService = async (req, res) => {
      const id = (req.user && req.user.id);
    
    try {
      const services = await getSpecificService(id);
      
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const serviceFromDriver = async (req, res) => {
    const status = req.body.status
      const id = (req.params.id);  
    try {
      const services = await updateServiceByIdFromDriver(id,status);
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
