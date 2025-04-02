/* const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

function generateAccessJWT(payload) {
  if (!ACCESS_SECRET) {
    throw new Error("INGEN ACCESS SECRET HITTADES I ENV");
  }

  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "12h" });
}

function verifyAccessToken(token) {
  if (!ACCESS_SECRET) {
    throw new Error("INGEN ACCESS SECRET HITTADES I ENV");
  }

  return jwt.verify(token, ACCESS_SECRET);
}

module.exports = {
  generateAccessJWT,
  verifyAccessToken
}; */

const jwt = require('jsonwebtoken');

// Läs hemlig nyckel från miljövariabler
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

// Logga nyckeln när filen laddas
console.log("🔐 ACCESS_SECRET loaded:", !!ACCESS_SECRET ? "[OK]" : "[MISSING]");

function generateAccessJWT(payload) {
  if (!ACCESS_SECRET) {
    throw new Error("❌ INGEN ACCESS SECRET HITTADES I ENV");
  }

  const token = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "12h" });

  // Logga token som genereras
  console.log("✅ Token skapad:", token);

  return token;
}

function verifyAccessToken(token) {
  if (!ACCESS_SECRET) {
    throw new Error("❌ INGEN ACCESS SECRET HITTADES I ENV");
  }

  const decoded = jwt.verify(token, ACCESS_SECRET);

  console.log("🔍 Verifierad token:", decoded);
  return decoded;
}

module.exports = {
  generateAccessJWT,
  verifyAccessToken
};

