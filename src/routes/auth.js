import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, isAdmin = false } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Det gick inte att registrera användaren" });
    }
    const user = new User({ email, password, isAdmin });
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'hemlig_nyckel',
      { expiresIn: '1h' }
    );
    res.status(201).json({
      token,
      user: { _id: user._id, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.warn("Register error:", error);
    res.status(500).json({ error: 'Serverfel vid registrering' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Ogiltig inloggning' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Ogiltig inloggning' });
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'hemlig_nyckel',
      { expiresIn: '1h' }
    );
    res.json({
      token,
      user: { _id: user._id, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.warn("Login error:", error);
    res.status(500).json({ error: 'Serverfel vid inloggning' });
  }
});

export default router;
