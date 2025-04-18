import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateAccessToken } from '../utils/jwt.js';
import createAuthMiddleware, { adminAuth } from '../middleware/auth.js';

const auth = createAuthMiddleware();
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Error vid registrering");
    }

    const user = new User({ email, password, firstName, lastName, isAdmin: false });
    await user.save();

    const token = generateAccessToken({ userId: user._id, isAdmin: user.isAdmin });

    res.status(201).json({
      message: "Användare registrerad korrekt"
    });
  } catch (error) {
    console.warn("Register error:", error.message);
    res.status(500).json({ error: 'Serverfel vid registrering' });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Kunde inte hitta användare");
    }

    const isPasswordSame = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordSame) {
      throw new Error("Ogiltigt lösenord");
    }

    const token = generateAccessToken({
      userId: user._id,
      isAdmin: user.isAdmin
    });

    res.json({
      message: "Inloggningen lyckades",
      accessToken: token,
      user: {
        firstName: user.firstName,
        email: user.email,
        role: user.isAdmin ? "admin" : "user"
      }
    });
  } catch (error) {
    console.warn("Kunde inte logga in användare:", error.message);
    res.status(400).json({
      error: "Kunde inte logga in"
    });
  }
});

//GET ALL USERS
router.get("/admin/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error.message);
    res.status(401).json({
      message: "Kunde inte hämta användare"
    });
  }
});

// GET USER
router.get("/me", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Du behöver logga in igen");
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({
      message: "Du behöver logga in igen"
    });
  }
});


export default router;
