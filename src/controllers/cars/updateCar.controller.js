const {Car} = require("../../models");

/**
 * @typedef {{brand: string, model: string, year: number, color: string, price: number, exposition_color: string, numberplate: string, doors: number, motorization: number, fuel: string}} Car
 *
 */

module.exports = async function updateCar(req, res) {
	const {id} = req.params;

	if (!id) return res.status(400).send({message: "Id is required"});

	if (isNaN(id)) return res.status(400).send({message: "Id must be a number"});

	const fields = Object.keys(req.body);

	if (!fields.length) return res.status(400).send({message: "Missing parameters"});

	/**
	 * create an object with the fields to update
	 * @type {Car}
	 */
	const newCar = Object.fromEntries(fields.map((field) => [field, req.body[field]]));

	try {
		// update car
		await Car.update(newCar, {where: {id}});
	} catch (error) {
		return res.status(500).send({message: error.message});
	}

	return res.status(200).send({message: "Car updated successfully"});
};
