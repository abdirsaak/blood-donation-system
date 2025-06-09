import express from 'express';
import { loginUser, registerUser } from '../controllers/auth_controller.js';
import { getUserProfile } from '../controllers/user_controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile/:id', verifyToken, getUserProfile);





export default router;


