import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("No authorization");
    }

    const token = authorization.split(" ")?.[1];
    if (!token) {
      throw new Error("No token");
    }

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decryptedToken.userId;
    req.isAdmin = decryptedToken.isAdmin;
    next();
  } catch (error) {
    console.warn("Error authorizing endpoint:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  });
};

