const { verifyAccessToken } = require("../utils/jwt");

function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("Ingen eller ogiltig Authorization-header:", authHeader);
      return res.status(401).json({ message: "Ingen token hittades" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;

    next();
  } catch (error) {
    console.warn("Auth error:", error.message);
    return res.status(401).json({ message: "Inte auktoriserad" });
  }
}

module.exports = auth;
