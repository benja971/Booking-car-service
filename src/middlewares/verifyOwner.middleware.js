import verifyAdmin from "../middlewares/verifyUser.middleware.js";

import db from "../models/index.js";
const { Reservation } = db;

/**
 * Verify if the user is the owner of the reservation or an admin
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * @returns {Response} 403 if the user is not the owner of the reservation or an admin
 * @returns {Response} 500 if an error occured
 *
 * @returns {Function} next if the user is the owner of the reservation or an admin
 */
export default async function verifyOwner(req, res, next) {
	/**
	 * @type {{id: number}} req.params
	 */
	const { id } = req.params;
	/**
	 * @type {{userId: number, roleId: number}} req.tokenDatas
	 */
	const { userId, roleId } = req.tokenDatas;

	try {
		/**
		 * @type {{userId: number}} reservation
		 */
		const resa = (await Reservation.findOne({ where: { id } })).dataValues;

		if (resa.userId !== userId && roleId !== 2)
			return res.status(403).send({ message: "Require to be owner or admin" });

		if (roleId === 2) return verifyAdmin(req, res, next);
	} catch (error) {
		return res.status(500).send({ message: error });
	}

	next();
}
