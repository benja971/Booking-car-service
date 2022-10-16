import { Sequelize } from "sequelize";
/**
 * @type {Sequelize.Model}
 */
import { car as Cars } from "../../models";

/**
 * Delete a car from the database
 *
 * @group Cars
 * @route Delete /cars/delete/:id
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function deleteCar(req, res) {
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
		await Cars.destroy({
			where: {
				id,
			},
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while deleting car" });
	}

	res.status(200);
}


