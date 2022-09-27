const db = require("../../models");
const Car = db.car;

async function readCars(req, res) {
	try {
		const cars = await Car.findAll();

		return res.status(200).send(cars);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

async function readCar(req, res) {
	const { id } = req.params;

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	if (!id) return res.status(400).send({ message: "Id is required" });

	try {
		const car = await Car.findOne({ where: { id } });

		if (!car) return res.status(404).send({ message: "Car not found" });

		return res.status(200).send(car);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

module.exports = {
	readCars,
	readCar,
};
