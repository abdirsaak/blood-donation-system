import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  deleteAppointment,
  updateAppointment
} from '../controllers/donate_controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';



const router = express.Router();

// User creates an appointment
router.post('/', verifyToken, createAppointment);

// User views their appointments
router.get('/my', verifyToken, getMyAppointments);


// User update their appointments
router.put('/:id', verifyToken, updateAppointment);
// User deletes their own appointment
router.delete('/:id', verifyToken, deleteAppointment);

export default router;
