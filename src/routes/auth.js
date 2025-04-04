import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateAccessToken, verifyAccessToken } from '../utils/jwt.js';

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const user = new User({ email, password, firstName, lastName, isAdmin: false });
    await user.save();

    const token = generateAccessToken({ userId: user._id, isAdmin: user.isAdmin });

    res.status(201).json({
      message: "User registered correctly"
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
      throw new Error("User not found");
    }

    const isPasswordSame = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordSame) {
      throw new Error("Invalid password");
    }

    const token = generateAccessToken({
      userId: user._id,
      isAdmin: user.isAdmin
    });

    res.json({
      message: "Login successful",
      accessToken: token,
      user: {
        firstName: user.firstName,
        email: user.email,
        role: user.isAdmin ? "admin" : "user"
      }
    });
  } catch (error) {
    console.warn("Error logging in user:", error.message);
    res.status(400).json({
      error: "User unable to login"
    });
  }
});

// GET USER
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }
    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error.message);
    res.status(500).json({ error: "Kunde inte hämta användaren" });
  }
});

export default router;
