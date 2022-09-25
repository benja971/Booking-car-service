const db = require("../../models");
const resa = db.reservation;

async function deleteResa(req, res) {
	const { id } = req.params;

	if (!id) return res.status(400).json({ message: "Id is required" });

	if (isNaN(id)) return res.status(400).json({ message: "Id must be a number" });

	try {
		// delete reservation
		await resa.destroy({ where: { id } });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	return res.status(200).json({ message: "Reservation deleted successfully" });
}

module.exports = deleteResa;
