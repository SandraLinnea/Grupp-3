import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  //TODO Implement authentication
  return next();
};

export const adminAuth = async (req, res, next) => {
  //TODO Implement admin authentication
  return next();
};


<<<<<<< HEAD

//OBS! Glöm inte att lägga till JWT_SECRET i .env filen

/* //NOTE: Auth middleware for user authentication
export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not set' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}; */

/* //NOTE: Auth middleware for admin authentication
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not set' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}; */
=======
import jwt from 'jsonwebtoken';

>>>>>>> 25ca2da127e443e9b65d045b11a043dda7e7b53e
