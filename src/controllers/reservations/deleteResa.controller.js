const { Reservation } = require("../../models");

module.exports = async function deleteResa(req, res) {
	/**
	 * @type {Reservation}
	 */
	const { id } = req.params;

	if (!id) return res.status(400).send({ message: "Id is required" });

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	try {
		// delete reservation
		await Reservation.destroy({ where: { id } });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}

	return res.status(200);
};
