const db = require("../../models");
const resa = db.reservation;

async function isOverlaping(req, res, reservation) {
	const { startDate, endDate, carId } = reservation;
	try {
		// count all reservations for this car with date overlapping with the new reservation
		const count = await resa.count({
			where: {
				carId,
				[db.Sequelize.Op.or]: [
					{
						startDate: {
							[db.Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
						},
					},
					{
						endDate: {
							[db.Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
						},
					},
				],
			},
		});

		return count > 0;
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

module.exports = { isOverlaping };
