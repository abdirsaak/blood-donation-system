import { db } from "../db.js";

export const getAdminProfile = (req, res) => {
  const adminId = req.params.id;

  const sql = 'SELECT id, fullName, email, role FROM users WHERE id = ? AND role = "admin"';
  db.query(sql, [adminId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(403).json({ message: "Not an admin" });

    res.json(results[0]);
  });
};



// Get all appointments along with user info
export const getAllAppointments = (req, res) => {
  const sql = `
    SELECT da.id, da.bloodType, da.appointmentDate,da.created_at, da.location, da.status,
           u.id AS userId, u.fullName, u.email
    FROM donate_appointments da
    JOIN users u ON da.user_id = u.id
    ORDER BY da.appointmentDate DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Update the status of a specific appointment
export const updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const sql = 'UPDATE donate_appointments SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Status updated successfully' });
  });
};
