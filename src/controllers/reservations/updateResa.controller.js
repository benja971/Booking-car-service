const { Reservation } = require("../../models");
const { isOverlaping } = require("./reservations.utilities");

module.exports = async function updateResa(req, res) {
	/**
	 * @type {Reservation}
	 */
	const { id, startDate, endDate, carId, userId } = req.body;

	if (!id)
		return res.status(400).send({
			message: "id is required",
		});

	if (isNaN(id)) return res.status(400).send({ message: "id must be a number" });

	if (isNaN(carId)) return res.status(400).send({ message: "carId must be a number" });

	if (isNaN(userId)) return res.status(400).send({ message: "userId must be a number" });

	// verify if date have correct format
	if (startDate && isNaN(Date.parse(startDate))) {
		return res.status(400).send({ message: "startDate must be a date" });
	}

	if (endDate && isNaN(Date.parse(endDate))) {
		return res.status(400).send({ message: "endDate must be a date" });
	}

	// dates must be after today
	if (startDate < Date.now() && startDate < Date.now()) {
		return res.status(400).send({ message: "startDate must be after today" });
	}

	try {
		// get the reservation to update
		const reservation = (await Reservation.findOne({ where: { id } })).dataValues;

		// check if reservation exists
		if (!reservation)
			return res.status(404).send({
				message: "Reservation not found",
			});

		const newresa = {};

		for (const key in reservation) {
			if (req.body[key]) newresa[key] = req.body[key];
			else newresa[key] = reservation[key];
		}

		// check if dates are after today
		if (newresa.startDate < Date.now() || newresa.endDate < Date.now())
			return res.status(400).send({ message: "Dates must be after today" });

		// check if start is before end
		if (new Date(newresa.startDate) >= new Date(newresa.endDate))
			return res.status(400).send({ message: "Start date must be before end date" });

		// check if there is no overlapping reservation
		if (await isOverlaping(req, res, newresa))
			return res.status(400).send({
				message: "This car is already reserved for this period",
			});

		await Reservation.update(newresa, { where: { id } });
	} catch (error) {
		return res.status(500).send({
			message: error.message,
		});
	}

	res.status(200);
};
