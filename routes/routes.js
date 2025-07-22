import express from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import reservationRoutes from './reservation.routes.js';
import trajetRoutes from './trajet.routes.js';
import paymentRoutes from './payment.routes.js';
import transportRoutes from './transport.routes.js';
import chauffeurRoutes from './chauffeur.routes.js';
import serviceRoutes from './service.routes.js';
import { protect } from '../middleware/authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();
router.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','home.html'));
})
router.get('/login',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','login_reg.html'));
})
router.get('/passenger',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','passenger-dashboard.html'));
});
router.get('/admin',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','admin-dashboard.html'));
});
router.get('/driver',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','driver-dashboard.html'));
});
router.get('/caissier',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','cachier-dashboard.html'));
});
router.get('/reset',(req,res)=>{
res.sendFile(path.join(__dirname,'../','views','reset.html'));
});
// Auth & Profile
router.use('/api', authRoutes);               // login, register, profile, password
router.use('/api/admin', userRoutes);         // admin: user management

// Chauffeur Management (Admin)
router.use('/api/chauffeurs', chauffeurRoutes);     // drivers

// Reservations (Passenger, Cashier)
router.use('/api/reservations', reservationRoutes); // all reservation logic

// Trajets (Driver + Admin)
router.use('/api/trajets', trajetRoutes);     // trips (assigned, modify, etc.)

// Payments (Cashier)
router.use('/api/payments', paymentRoutes);   // mark as paid/reject

// Transport Management (Admin)
router.use('/api/transports', transportRoutes);     // transport types

import adminRoutes from './user.routes.js';
router.use('/api/admin', adminRoutes);


// Services (Admin)
router.use('/api/services', serviceRoutes);         // transport services

export default router;