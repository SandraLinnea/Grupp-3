import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

function generateAccessToken(payload) {
    if (!ACCESS_SECRET) {
        throw new Error("NO JWT_SECRET FOUND IN ENV");
    }

    const token = jwt.sign(
        payload,
        ACCESS_SECRET,
        {
            expiresIn: "12h"
        }
    );

    return token;
}

function verifyAccessToken(token) {
    if (!ACCESS_SECRET) {
        throw new Error("NO JWT_SECRET FOUND IN ENV");
    }

    const decryptedToken = jwt.verify(token, ACCESS_SECRET);

    return decryptedToken;
}

export {
    generateAccessToken,
    verifyAccessToken
}
