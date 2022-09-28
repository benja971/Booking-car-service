const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

async function verifyToken(req, res, next) {
	// get OAuth token from request header
	const token = req.headers["authorization"]?.split(" ")[1];

	if (!token) return res.status(403).json({ message: "No token provided" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({ id: decoded.userId });

		req.tokenDatas = decoded;
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
}

async function verifyAdmin(req, res, next) {
	const { userId, roleId } = req.tokenDatas;

	try {
		const user = await User.findOne({ id: userId });

		if (user.roleId !== roleId || roleId !== 2)
			return res.status(403).json({ message: "Require Admin Role" });
	} catch (error) {
		return res.status(500).json({ message: error });
	}

	next();
}

module.exports = { verifyToken, verifyAdmin };
