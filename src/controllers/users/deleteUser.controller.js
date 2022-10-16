import { user as Users } from "../../models";

export default async function deleteUser(req, res) {
	/**
	 * @type {User}
	 */
	const { id } = req.params;

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	if (!id)
		return res.status(400).send({
			message: "Content cannot be empty !",
		});

	try {
		// delete user from database
		await Users.destroy({
			where: {
				id,
			},
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while deleting user" });
	}

	res.status(200);
}
