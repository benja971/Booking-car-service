const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async function createToken(req, res) {
	/**
	 * @type {{email: string, password: string}}
	 */
	const { email, password } = req.body;

	try {
		/**
		 * @type {{id: number, name: string, email: string, password: string}} user
		 */
		const user = (
			await User.findOne({
				where: { email },
			})
		)?.dataValues;

		if (!user) return res.status(404).send({ message: 'User not found' });

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) return res.status(401).send({ message: 'Invalid password' });

		const { id, roleId } = user;

		const token = sign({ userId: id, roleId }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		delete user.password;

		res.send({ user, token });
	} catch (error) {
		res.status(500).send({ message: 'Internal server error' });
	}
};
