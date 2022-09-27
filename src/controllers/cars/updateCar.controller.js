const db = require("../../models");
const Car = db.car;

async function updateCar(req, res) {
	const { id } = req.params;
	const { model } = req.body;

	if (!id) return res.status(400).send({ message: "Id is required" });

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	if (!model)
		return res.status(400).send({
			message: "Model is required",
		});

	try {
		// update car
		await Car.update({ model }, { where: { id } });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}

	return res.status(200).send({ message: "Car updated successfully" });
}

module.exports = updateCar;