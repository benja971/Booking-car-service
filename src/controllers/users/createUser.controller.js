import { hash } from "bcrypt";

import db from "../../models/index.js";
const { User } = db;

export default async function createUser(req, res) {
	const { name, email, password, roleId } = req.body;

	// check if there is 4 parameters
	if (!name || !email || !password || !roleId)
		return res.status(400).send({ message: "Missing parameters" });

	try {
		const crypted = await hash(password, 10);

		// add user to database
		// no need to check if the user already exists because of the unique constraint in the database
		await User.create({
			name,
			email,
			password: crypted,
			roleId,
		});
	} catch (error) {
		return res.status(500).send({ message: "Error while creating user" });
	}

	res.status(200);
}
