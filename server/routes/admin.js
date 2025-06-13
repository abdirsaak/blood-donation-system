import express from 'express';
import { getAdminProfile,getAllAppointments, updateAppointmentStatus } from '../controllers/admin_controller.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';



const router = express.Router();
router.get('/profile/:id', verifyToken, requireAdmin, getAdminProfile);
router.get('/appointments', verifyToken, requireAdmin, getAllAppointments);
router.put('/appointment/:id/status', verifyToken, requireAdmin, updateAppointmentStatus);



export default router;
