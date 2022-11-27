const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();

const app_secret = process.env.APP_SECRET;
function generateAccessToken(userData) {
	let token = jsonWebToken.sign(userData, app_secret);
	return token;
}

function verifyAccessToken(token) {
	let data = jsonWebToken.verify(token, app_secret);
	return data;
}

module.exports = { generateAccessToken, verifyAccessToken };
