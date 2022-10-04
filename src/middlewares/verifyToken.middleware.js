const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

/**
 * Verify if the user provided a valid token
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @returns {Response} 401 if the user didn't provide a token0
 * @returns {Response} 403 if the token is invalid
 *
 * @returns {Function} next if the token is valid
 */
async function verifyToken(req, res, next) {
	// get OAuth token from request header
	const token = req.headers["authorization"]?.split(" ")[1];

	if (!token) return res.status(401).json({ message: "No token provided" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({ id: decoded.userId });

		req.tokenDatas = decoded;
	} catch (error) {
		return res.status(403).json({ message: "Unauthorized" });
	}

	next();
}

/**
 * Verify if the user is an admin
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @returns {Response} 500 if the user is not an admin
 */
async function verifyAdmin(req, res, next) {
	const { userId, roleId } = req.tokenDatas;

	try {
		const user = await User.findOne({ where: { id: userId, roleId } });
	} catch (error) {
		return res.status(500).json({ message: "Require admin role" });
	}

	next();
}

module.exports = { verifyToken, verifyAdmin };
