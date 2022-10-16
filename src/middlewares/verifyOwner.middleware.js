const db = require("../models");
const Reservation = db.reservation;

const { verifyAdmin } = require("./verifyToken.middleware");

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
async function verifyOwner(req, res, next) {
	const { userId, roleId } = req.tokenDatas;
	const { id } = req.params;

	try {
		const resa = (await Reservation.findOne({ where: { id } })).dataValues;

		if (resa.userId !== userId && roleId !== 2)
			return res.status(403).send({ message: "Require to be owner or admin" });

		if (roleId === 2) return verifyAdmin(req, res, next);
	} catch (error) {
		return res.status(500).send({ message: error });
	}

	next();
}

module.exports = verifyOwner;
