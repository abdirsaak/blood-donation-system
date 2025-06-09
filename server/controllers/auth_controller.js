import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const registerUser = async (req, res) => {
  const { fullName, email, password, gender, location, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (fullName, email, password, Gender, location, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [fullName, email, hashedPassword, gender, location, role || 'user'], (err, result) => {
      if (err) {
    console.error("MySQL error:", err);  // ✅ Add this line
    return res.status(500).json({ error: err });
  }
      // if (err) return res.status(500).json({ error: err });
      res.json({ message: "User registered successfully" });
    });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid password' });

    // ✅ Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};
