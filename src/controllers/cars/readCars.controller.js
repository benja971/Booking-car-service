const { Car, Image } = require('../../models');

/**
 * get all cars from the database
 *
 * @typedef {{brand: string, model: string, year: number, color: string, price: number, exposition_color: string, numberplate: string, doors: number, motorization: number, energy: string}} Car
 *
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
	/**
	 * @type {Car} options
	 */
	// const options = req?.body?.options;

	// TODO: add pagination

	try {
		return res.status(200).send(
			await Car.findAll({
				attributes: [
					'id',
					'model',
					'price',
					'notation',
					'description',
					'exposition_color',
					'text_color',
				],
				include: [
					{
						model: Image,
						attributes: ['id', 'name', 'url'],
					},
				],
				// where: options ? JSON.parse(options) : {},
			}),
		);
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

	if (isNaN(id)) return res.status(400).send({ message: 'Id must be a number' });

	if (!id) return res.status(400).send({ message: 'Id is required' });

	try {
		return res.status(200).send(
			await Car.findOne({
				where: {
					id,
				},
				include: [Image],
			}),
		);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

module.exports = { readCars, readCar };
