const db = require("../../models");
const Car = db.cars;

async function readCars(req, res) {
	try {
		const cars = await Car.findAll();
		return res.status(200).json(cars);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function readCar(req, res) {
	const { id } = req.params;

	if (isNaN(id)) return res.status(400).json({ message: "Id must be a number" });

	if (!id) return res.status(400).json({ message: "Id is required" });

	try {
		const car = await Car.findOne({ where: { id } });
		return res.status(200).json(car);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	readCars,
	readCar,
};
