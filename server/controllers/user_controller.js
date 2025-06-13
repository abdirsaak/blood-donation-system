import { db } from "../db.js";
import bcrypt from "bcrypt";

export const getUserProfile = (req, res) => {
  const userId = req.params.id;

  const sql = 'SELECT id, fullName, email, password, Gender, location, role FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    console.log('user server: ',user);
    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      gender: user.Gender,      // normalize casing
      location: user.location,
      role: user.role
    });
  });
};

export const updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const { fullName, email, gender, location, password } = req.body;

  let sql = 'UPDATE users SET fullName = ?, email = ?, gender = ?, location = ?';
  const values = [fullName, email, gender, location];

  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    sql += ', password = ?';
    values.push(hashedPassword);
  }

  sql += ' WHERE id = ?';
  values.push(userId);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Profile updated' });
  });
};