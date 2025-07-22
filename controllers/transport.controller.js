
import {
  createTransport,
  updateTransportById,
  deleteTransportById,
  searchTransports,
  searchTransportsAll
} from '../models/transport.model.js';

// POST /api/transports
export const addTransport = async (req, res) => {
  const { type, capacite, matricule } = req.body;
  console.log(type,capacite,matricule);
  
  try {
    const result = await createTransport(type, capacite, matricule);
    res.status(201).json({ message: 'Transport added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/transports/:id
export const updateTransport = async (req, res) => {
  const { type, capacite, matricule } = req.body;
  const { id } = req.params;

  try {
    await updateTransportById(id, type, capacite, matricule);
    res.redirect('/admin');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/transports/:id
export const deleteTransport = async (req, res) => {
  try {
    await deleteTransportById(req.params.id);
    res.json({ message: 'Transport deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/transports/search:id
export const searchTransport = async (req, res) => {
  const idvehicle = req.params.id;
  
  try {
    const transports = await searchTransports(idvehicle);
    res.json(transports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const searchTransportAll = async (req, res) => {
  try {
    const transports = await searchTransportsAll();
    res.json(transports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
