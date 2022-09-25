const db = require("../../models");
const resa = db.reservation;

async function readResa(req, res) {
	const { id } = req.params;

	if (!id) return res.status(400).json({ message: "Id is required" });

	if (isNaN(id)) return res.status(400).json({ message: "Id must be a number" });

	let reservation;

	try {
		// find reservation
		reservation = await resa.findByPk(id);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	if (!reservation) return res.status(404).json({ message: "Reservation not found" });

	return res.status(200).json(reservation);
}

async function readResas(req, res) {
	try {
		const reservations = await resa.findAll();
		return res.status(200).send(reservations);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = { readResa, readResas };
