const db = require("../../models");
const users = db.user;

async function deleteUser(req, res) {
	const { id } = req.query;

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	if (!id)
		return res.status(400).send({
			message: "Content cannot be empty !",
		});

	try {
		// delete user from database
		await users.destroy({
			where: {
				id,
			},
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while deleting user" });
	}

	res.status(200).send({ message: "User deleted" });
}

module.exports = deleteUser;
