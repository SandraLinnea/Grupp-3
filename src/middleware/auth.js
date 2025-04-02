import jwt from 'jsonwebtoken';

/**
 * Endast inloggade användare har tillgång
 */
export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Ingen token hittades' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    req.role = decoded.role; // roll: 'admin' eller 'user'

    next();
  } catch (error) {
    console.warn('Auktoriseringsfel:', error.message);
    return res.status(401).json({ message: 'Obehörig' });
  }
};

/**
 * Endast administratörer har tillgång
 */
export const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Endast administratörer har tillgång' });
    }
    next();
  });
};
