import express from 'express';
import {
getAdminProfile,
getAllAppointments, 
updateAppointmentStatus,
getDashboardStats,
getAllUsers,
deleteUser,
createAdmin} from '../controllers/admin_controller.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';



const router = express.Router();
router.get('/profile/:id', verifyToken, requireAdmin, getAdminProfile);
router.get('/appointments', verifyToken, requireAdmin, getAllAppointments);
router.put('/appointment/:id/status', verifyToken, requireAdmin, updateAppointmentStatus);

router.get("/dashboard-stats", verifyToken, requireAdmin, getDashboardStats);
router.get('/users', verifyToken, requireAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, requireAdmin, deleteUser);
router.post('/create-admin', verifyToken, requireAdmin, createAdmin);


export default router;
