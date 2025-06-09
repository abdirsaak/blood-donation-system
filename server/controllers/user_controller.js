import { db } from "../db.js";

export const getUserProfile = (req, res) => {
  const userId = req.params.id;

  const sql = 'SELECT id, fullName, email, role FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(results[0]);
  });
};
