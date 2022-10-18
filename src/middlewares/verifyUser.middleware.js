import verifyToken from "./verifyToken.middleware.js";
const { verifyAdmin } = verifyToken;

import db from "../models/index.js";
const { User } = db;

/**
 * Allow or not to reaa, update, delete a user if user is admin or the user itself
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @returns {Response} 403 if the user is not allowed to do this action
 */
export default async function verifyUser(req, res, next) {
	/**
	 * @type {{id: number}} req.params
	 */
	const { id: userWanted } = req.params;
	/**
	 * @type {{userId: number, roleId: number}} req.tokenDatas
	 */
	const { userId, roleId } = req.tokenDatas;

	try {
		/**
		 * @type {{id: number, roleId: number}} user
		 */
		const user = (await User.findOne({ where: { id: userWanted } })).dataValues;

		if (user.id !== userId && roleId !== 2)
			return res.status(403).send({ message: "Require to be owner of the account or admin" });

		if (roleId === 2) return verifyAdmin(req, res, next);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}

	next();
}
