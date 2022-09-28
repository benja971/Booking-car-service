const db = require("../../models");
const resa = db.reservation;
const { isOverlaping } = require("./reservations.utilities");

async function createResa(req, res) {
	const { startDate, endDate, carId, userId } = req.body;

	const notvalid = !startDate || !endDate || !carId || !userId;

	// check if all fields are filled
	if (notvalid)
		return res.status(400).send({ message: "All fields are required" });

	// check if dates are after today
	if (startDate < Date.now() || endDate < Date.now())
		return res.status(400).send({ message: "Dates must be after today" });

	// check if start is before end
	if (new Date(startDate) >= new Date(endDate))
		return res
			.status(400)
			.send({ message: "Start date must be before end date" });

	// check if carId is a number
	if (isNaN(carId))
		return res.status(400).send({ message: "Car id must be a number" });

	// check if userId is a number
	if (isNaN(userId))
		return res.status(400).send({ message: "User id must be a number" });

	const isOverlapingResa = await isOverlaping(req, res, req.body);

	// check if there is no overlapping reservation
	if (isOverlapingResa)
		return res
			.status(400)
			.send({ message: "This car is already reserved for this period" });

	try {
		await resa.create({ startDate, endDate, carId, userId });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}

	return res
		.status(200)
		.send({ message: "Reservation created successfully" });
}

module.exports = createResa;
