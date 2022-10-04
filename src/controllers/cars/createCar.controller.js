const db = require("../../models");
const cars = db.car;

async function createCar(req, res) {
	const { brand, model, year, color, price } = req.body;

	if (!(brand && model && year && color && price))
		return res.status(400).send({
			message: "Content cannot be empty!",
		});

	try {
		// add car to database
		const car = await cars.create({
			brand,
			model,
			year,
			color,
			price,
		});

		return res.status(201).send(car);
	} catch (error) {
		return res.status(500).send({ message: "Error while creating car" });
	}
}

module.exports = createCar;
