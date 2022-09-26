const db = require("../../models");
const users = db.user;

async function readUsers(req, res) {
	try {
		const users = await users.findAll();
		return res.status(200).send(users);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

async function readUser(req, res) {
	const { id } = req.params;

	if (!id) return res.status(400).send({ message: "Id is required" });

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	try {
		// find user
		const user = await users.findByPk(id);
		return res.status(200).send(user);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

module.exports = {
	readUsers,
	readUser,
};
