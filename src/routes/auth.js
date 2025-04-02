const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

const User = require("../models/User");
const { generateAccessJWT } = require("../utils/jwt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, isAdmin = false } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const user = new User({ email, password, firstName, lastName, isAdmin });
    await user.save();

    res.status(201).json({
      message: "User registered correctly"
    });
  } catch (error) {
    console.warn("Error registering user:", error.message);
    res.status(400).json({
      error: "User unable to register"
    });
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

    const token = generateAccessJWT({
      userId: user._id,
      isAdmin: user.isAdmin
    });

    res.json({
      token,
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

module.exports = router;
