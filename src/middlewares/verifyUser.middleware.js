const db = require("../models");
const User = db.user;

const { verifyAdmin } = require("./verifyToken.middleware");

/**
 * Allow or not to reaa, update, delete a user if user is admin or the user itself
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @returns {Response} 403 if the user is not allowed to do this action
 */
async function verifyUser(req, res, next) {
	const { id: userWanted } = req.params;
	const { userId, roleId } = req.tokenDatas;

	try {
		const user = (await User.findOne({ where: { id: userWanted } })).dataValues;

		if (user.id !== userId && roleId !== 2)
			return res.status(403).send({ message: "Require to be owner of the account or admin" });

		if (roleId === 2) return verifyAdmin(req, res, next);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}

	next();
}

module.exports = verifyUser;
