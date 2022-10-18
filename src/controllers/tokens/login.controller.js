import { compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

import db from "../../models/index.js";
const { User } = db;

export default async function createToken(req, res) {
	const { email, password } = req.body;

	try {
		const user = (
			await User.findOne({
				where: { email },
			})
		).dataValues;

		if (!user) return res.status(404).send({ message: "User not found" });

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) return res.status(401).send({ message: "Invalid password" });

		const { id, roleId } = user;

		const token = sign({ userId: id, roleId }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		delete user.password;

		res.send({ user, token });
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
}
