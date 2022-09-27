const db = require("../../models");
const cars = db.car;

async function deleteCar(req, res) {
	const { id } = req.params;

	if (!id)
		return res.status(400).send({
			message: "Content cannot be empty !",
		});

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	try {
		// delete car from database
		await cars.destroy({
			where: {
				id,
			},
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while deleting car" });
	}

	res.status(200).send({ message: "Car deleted" });
}

module.exports = deleteCar;
