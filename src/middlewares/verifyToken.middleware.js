const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

async function verifyToken(req, res, next) {
	// get OAuth token from request header
	const token = req.headers["authorization"]?.split(" ")[1];

	console.log("token", token);

	if (!token) return res.status(403).json({ message: "No token provided" });

	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ id: decoded.userId });
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
}

module.exports = verifyToken;
