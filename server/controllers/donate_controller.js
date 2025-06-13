import { db } from '../db.js';

// ✅ Create a new appointment
export const createAppointment = (req, res) => {
  const { bloodType, appointmentDate, location } = req.body;
  const userId = req.user.id;

  // First, check if the user already has an appointment for this blood type
  const checkSql = `
    SELECT COUNT(*) AS count
    FROM donate_appointments
    WHERE user_id = ? AND bloodType = ?
  `;

  db.query(checkSql, [userId, bloodType], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results[0].count > 0) {
      // User already has an appointment with this blood type
      return res.status(400).json({ message: 'Already created this blood type' });
    }

    // If not, proceed to insert
    const insertSql = `
      INSERT INTO donate_appointments (user_id, bloodType, appointmentDate, location)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertSql, [userId, bloodType, appointmentDate, location], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.status(201).json({ message: 'Appointment created successfully' });
    });
  });
};

// export const createAppointment = (req, res) => {
//   const { bloodType, appointmentDate, location } = req.body;
//   const userId = req.user.id;

//   const sql = `
//     INSERT INTO donate_appointments (user_id, bloodType, appointmentDate, location)
//     VALUES (?, ?, ?, ?)
//   `;

//   db.query(sql, [userId, bloodType, appointmentDate, location], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: 'Appointment created successfully' });
//   });
// };

// ✅ Get the logged-in user's appointments
export const getMyAppointments = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT id, bloodType, appointmentDate, location, status, created_at
    FROM donate_appointments
    WHERE user_id = ?
    ORDER BY appointmentDate DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ appointments: results });
  });
};

export const updateAppointment = (req, res) => {
  const userId = req.user.id;
  const appointmentId = req.params.id;
  const { bloodType, appointmentDate, location } = req.body;

  const sql = `
    UPDATE donate_appointments
    SET bloodType = ?, appointmentDate = ?, location = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [bloodType, appointmentDate, location, appointmentId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found or not yours' });
    }

    res.json({ message: 'Appointment updated successfully' });
  });
};


// ✅ Delete a specific appointment by the user
export const deleteAppointment = (req, res) => {
  const userId = req.user.id;
  const appointmentId = req.params.id;

  const sql = `DELETE FROM donate_appointments WHERE id = ? AND user_id = ?`;

  db.query(sql, [appointmentId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found or not yours' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  });
};
