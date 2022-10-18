import db from "../../models/index.js";
const { Car } = db;

/**
 * Add a car to the database
 *
 * @group Cars
 * @route POST /car
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function createCar(req, res) {
	const { brand, model, year, color, price } = req.body;

	if (!(brand && model && year && color && price))
		return res.status(400).send({
			message: "Content cannot be empty!",
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
		});

		return res.status(201);
	} catch (error) {
		return res.status(500).send({ message: "Error while creating car" });
	}
}
