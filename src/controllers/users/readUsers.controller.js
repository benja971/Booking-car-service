import db from "../../models/index.js";
const { User } = db;

async function readUsers(req, res) {
	try {
		return res.status(200).send(await Users.findAll());
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
		return res.status(200).send(await User.findOne({ where: { id } }));
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

export default { readUsers, readUser };
