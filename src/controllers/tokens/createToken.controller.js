const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../../models");
const User = db.user;

async function createToken(req, res) {
	const { idUser } = req.body;

	try {
		const user = await User.findOne({ id: idUser });

		if (!user) return res.status(404).json({ message: "User not found" });

		const { id, roleId } = user;

		const token = await jwt.sign({ userId: id, roleId }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.send({ token });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = createToken;
