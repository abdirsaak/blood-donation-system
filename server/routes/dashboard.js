// routes/dashboard.js
import express from 'express';
import { getTotalAppointments, getTopAppointments } from '../controllers/dashboard_controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/total', verifyToken, getTotalAppointments);
router.get('/top', verifyToken, getTopAppointments);

export default router;
