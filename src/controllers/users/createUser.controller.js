const db = require("../../models");
const users = db.user;

async function createUser(req, res) {
	const { name } = req.body;

	if (!name)
		return res.status(400).send({
			message: "Content cannot be empty!",
		});

	try {
		// add car to database
		await users.create({
			name,
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while creating user" });
	}

	res.status(200).send({ message: "User created" });
}

module.exports = createUser;
