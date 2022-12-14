const { verify } = require("jsonwebtoken");
const { User } = require("../models");
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
	// get bearer token from request header
	const token = req.headers["authorization"]?.split(" ")[1];

	if (!token) return res.status(401).send({ message: "No token provided" }); // user need to be authenticated

	try {
		/**
		 * @type {{userId: number, roleId: number}} decoded
		 */
		const decoded = verify(token, process.env.JWT_SECRET);

		await User.findOne({ where: { id: decoded.userId } });
		req.tokenDatas = decoded;
	} catch (error) {
		return res.status(403).send({ message: "Unauthorized" });
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
	/**
	 * @type {{userId: number, roleId: number}} req.tokenDatas
	 */
	const { userId, roleId } = req.tokenDatas;

	try {
		await User.findOne({ where: { id: userId, roleId } });
	} catch (error) {
		return res.status(500).send({ message: "Require admin role" });
	}

	next();
}

module.exports = { verifyToken, verifyAdmin };
