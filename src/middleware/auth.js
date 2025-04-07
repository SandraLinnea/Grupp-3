import { verifyAccessToken } from '../utils/jwt.js';

const createAuthMiddleware = (requireAdmin = false) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Ingen eller ogiltig token' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);

      if (requireAdmin && !decoded.isAdmin) {
        return res.status(403).json({ message: 'Administratörsbehörighet krävs' });
      }

      req.user = decoded;
      req.userId = decoded.userId;
      req.isAdmin = decoded.isAdmin;

      next();
    } catch (error) {
      console.warn('Auth error:', error.message);
      res.status(401).json({ message: 'Inte auktoriserad', error: error.message });
    }
  };
};
export const userAuth = createAuthMiddleware(false); // Default is user authentication
export const adminAuth = createAuthMiddleware(true);
