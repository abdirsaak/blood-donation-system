// controllers/dashboard_controller.js
import { db } from '../db.js';

// 1. Get total appointments for logged-in user
export const getTotalAppointments = (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT COUNT(*) AS total FROM donate_appointments WHERE user_id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ totalAppointments: result[0].total });
  });
};

// 2. Get top 10 recent appointments for logged-in user
export const getTopAppointments = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT id, bloodType, appointmentDate, location, status
    FROM donate_appointments
    WHERE user_id = ?
    ORDER BY appointmentDate DESC
    LIMIT 10
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ topAppointments: results });
  });
};
