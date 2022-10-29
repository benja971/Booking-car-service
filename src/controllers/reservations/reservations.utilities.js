const { Sequelize, Reservation } = require("../../models");

async function isOverlaping(req, res, reservation) {
	const { startDate, endDate, carId } = reservation;
	try {
		// count all reservations for this car with date overlapping with the new reservation
		const count = await Reservation.count({
			where: {
				carId,
				[Sequelize.Op.or]: [
					{
						startDate: {
							[Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
						},
					},
					{
						endDate: {
							[Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
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
