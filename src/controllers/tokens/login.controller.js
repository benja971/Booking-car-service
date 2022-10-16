import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { user as User } from "../models";

export default async function createToken(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({
			where: { email },
		});

		if (!user) return res.status(404).send({ message: "User not found" });

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) return res.status(401).send({ message: "Invalid password" });

		const { id, roleId } = user;

		const token = sign({ userId: id, roleId }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		delete user.dataValues.password;

		res.send({ user: user.dataValues, token });
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
}
