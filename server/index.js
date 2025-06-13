import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db.js';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import donateRoutes from './routes/donate.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/donate', donateRoutes);
app.use('/api/dashboard', dashboardRoutes);


// DB connection check
db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
