const { Car } = require("../../models");

/**
 * Delete a car from the database
 *
 * @group Cars
 * @route Delete /cars/delete/:id
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = async function deleteCar(req, res) {
	/**
	 * @type {Car}
	 */
	const { id } = req.params;

	if (!id)
		return res.status(400).send({
			message: "Content cannot be empty !",
		});

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	try {
		// delete car from database
		await Car.destroy({
			where: {
				id,
			},
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while deleting car" });
	}

	res.status(200);
};
