import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//TODO Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Hämta användare från DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Fel e-post eller lösenord" });
    }

    // 2. Kontrollera lösenordet
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Fel e-post eller lösenord" });
    }

    // 3. Kontrollera att användaren är admin
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Åtkomst nekad – inte admin" });
    }

    // 4. Skapa JWT-token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "hemlig_nyckel", // använd .env helst
      { expiresIn: "1h" }
    );

    // 5. Skicka token tillbaka
    res.json({ token, user: { email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.warn("Login error:", error);
    res.status(500).json({ error: "Serverfel vid inloggning" });
  }
});
export default router;