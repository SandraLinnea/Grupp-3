import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
      userId: user._id,
      role: user.isAdmin ? 'admin' : 'user'
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 86400000
    });

    res.json({
      message: 'Login successful',
      user: { firstName: user.firstName, email: user.email, role: user.isAdmin ? 'admin' : 'user' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

