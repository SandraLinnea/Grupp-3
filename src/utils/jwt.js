const jwt = require('jsonwebtoken');

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
};

