/** @format */

const jwt = require("jsonwebtoken");

const SECRET_KEY = "hknotplaformforhivpatientsandprofessionals12345";
async function generateToken(info) {
    try {
        const token = await jwt.sign(info, SECRET_KEY, { expiresIn: "12h" });
        return token;
    } catch (error) {
        return console.log(error),
            "could not generate token";
    }
}
// jwt == json web token
async function verifyToken(token) {
    try {
        let verify = await jwt.verify(token, SECRET_KEY);
        return verify;
    } catch (error) {
        return console.log(error),
            "could not generate token";
    }
}
module.exports = [generateToken, verifyToken];
