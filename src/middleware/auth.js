const { verifyAccessToken } = require("../utils/jwt");

function adminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Ingen token hittades" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Endast admin har behörighet" });
    }

    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;

    next();
  } catch (error) {
    console.warn("AdminAuth error:", error.message);
    res.status(401).json({ message: "Inte auktoriserad" });
  }
}

module.exports = adminAuth;
