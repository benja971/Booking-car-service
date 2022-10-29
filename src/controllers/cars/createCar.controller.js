const {Car} = require("../../models");

/**
 * Add a car to the database
 *
 * @typedef {{brand: string, model: string, year: number, color: string, price: number, exposition_color: string, numberplate: string, doors: number, motorization: number, energy: string}} Car
 *
 * @group Cars
 * @route POST /car
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = async function createCar(req, res) {
	/**
	 * @type {Car}
	 *
	 * @property {string} brand - The brand of the car
	 * @property {string} model - The model of the car
	 * @property {number} year - The year of the car
	 * @property {string} color - The color of the car
	 * @property {number} price - The price of the car
	 * @property {string} exposition_color - The color displayed in the app (hexadecimal)
	 * @property {string} numberplate - The numberplate of the car
	 * @property {number} doors - The number of doors of the car
	 * @property {number} motorization - The motorization of the car
	 * @property {string} energy - The energy of the car (diesel, gasoline, electric, hybrid)
	 *
	 */
	const {
		brand,
		model,
		year,
		color,
		price,
		exposition_color,
		numberplate,
		doors,
		motorzation,
		energy,
	} = req.body;

	if (
		!(
			brand &&
			model &&
			year &&
			color &&
			price &&
			exposition_color &&
			numberplate &&
			doors &&
			motorzation &&
			energy
		)
	)
		return res.status(400).send({
			message: "Missing parameters",
		});

	try {
		/**
		 * add car to database
		 *	@type {Car}
		 */
		await Car.create({
			brand,
			model,
			year,
			color,
			price,
			exposition_color,
			numberplate,
			doors,
			motorzation,
			energy,
		});

		return res.status(201);
	} catch (error) {
		return res.status(500).send({message: "Error while creating car"});
	}
};
