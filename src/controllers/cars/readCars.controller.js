import { Sequelize } from "sequelize";
/**
 * @type {Sequelize.Model}
 */
import { car as Cars } from "../../models";

/**
 * get all cars from the database
 *
 * @group Cars
 * @route GET /cars
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 *
 * @returns {Array<Car>} 200 - An array of cars
 */
async function readCars(req, res) {
	try {
		return res.status(200).send(await Cars.findAll());
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

/**
 * get a car from the database
 *
 * @group Cars
 * @route GET /cars/:id
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 *
 * @returns {Car} 200 - A car
 */
async function readCar(req, res) {
	/**
	 * @type {Car}
	 */
	const { id } = req.params;

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	if (!id) return res.status(400).send({ message: "Id is required" });

	try {
		return res.status(200).send(await Cars.findOne({ where: { id } }));
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

export default { readCars, readCar };
