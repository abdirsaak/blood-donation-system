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
