import { db } from "../db.js";
import bcrypt from 'bcrypt';


export const createAdmin = (req, res) => {
  const { fullName, email, password, gender, location } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Full name, email, and password are required" });
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const sql = `INSERT INTO users (fullName, email, password, gender, location, role) VALUES (?, ?, ?, ?, ?, 'admin')`;

  db.query(sql, [fullName, email, hashedPassword, gender, location], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ message: "New admin created successfully", adminId: result.insertId });
  });
};

export const getAdminProfile = (req, res) => {
  const adminId = req.params.id;

  const sql = 'SELECT id, fullName, email, role FROM users WHERE id = ? AND role = "admin"';
  db.query(sql, [adminId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(403).json({ message: "Not an admin" });

    res.json(results[0]);
  });
};



// // Get all appointments along with user info
// export const getAllAppointments = (req, res) => {
//   const sql = `
//     SELECT da.id, da.bloodType, da.appointmentDate,da.created_at, da.location, da.status,
//            u.id AS userId, u.fullName, u.email
//     FROM donate_appointments da
//     JOIN users u ON da.user_id = u.id
//     ORDER BY da.appointmentDate DESC
//   `;
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(results);
//   });
// };
export const getAllAppointments = (req, res) => {
  const sql = `
    SELECT 
      da.id, 
      da.bloodType, 
      da.appointmentDate, 
      da.created_at, 
      da.location, 
      da.status,
      u.id AS userId, 
      u.fullName, 
      u.email,
      da.donor_name
    FROM donate_appointments da
    LEFT JOIN users u ON da.user_id = u.id
    ORDER BY da.appointmentDate DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    
    // Optionally: format the result so if user is missing, use donor_name as "user"
    const formattedResults = results.map(row => ({
      ...row,
      displayName: row.fullName ? row.fullName : row.donor_name
    }));

    res.json(formattedResults);
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


// Get dashboard statistics
export const getDashboardStats = (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM donate_appointments) AS totalAppointments,
      (SELECT COUNT(*) FROM donate_appointments WHERE status = 'pending') AS totalPending,
      (SELECT COUNT(*) FROM donate_appointments WHERE status = 'approved') AS totalApproved,
      (SELECT COUNT(*) FROM donate_appointments WHERE status = 'rejected') AS totalRejected,
      (SELECT COUNT(*) FROM users WHERE gender = 'female') AS totalFemaleUsers,
      (SELECT COUNT(*) FROM users WHERE gender = 'male') AS totalMaleUsers
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]); // return as object
  });
};


export const getAllUsers = (req, res) => {
  console.log("Authenticated user:", req.user);  // ✅ Debug log

  const sql = `
    SELECT id, fullName, email, gender, role, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};


export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  });
};
