const db = require("../../models");
const cars = db.car;

async function createCar(req, res) {
	const { model } = req.body;

	if (!model)
		return res.status(400).send({
			message: "Content cannot be empty!",
		});

	try {
		// add car to database
		await cars.create({
			model,
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while creating car" });
	}

	res.status(200).send({ message: "Car created" });
}

module.exports = createCar;
