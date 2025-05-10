import {
    createService,
    updateServiceById,
    deleteServiceById,
    getAllServices
  } from '../models/service.model.js';
  
  // POST /api/services
  export const addService = async (req, res) => {
    const { nomService, description } = req.body;
  
    try {
      const result = await createService(nomService, description);
      res.status(201).json({ message: 'Service created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // PUT /api/services/:id
  export const updateService = async (req, res) => {
    const { nomService, description } = req.body;
    const { id } = req.params;
  
    try {
      await updateServiceById(id, nomService, description);
      res.json({ message: 'Service updated' });
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

  