import express from 'express';
import { getAdminProfile } from '../controllers/admin_controller.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';



const router = express.Router();
router.get('/profile/:id', verifyToken, requireAdmin, getAdminProfile);


export default router;
