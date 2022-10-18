export default (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
		},
		name: {
			type: Sequelize.STRING,
			trim: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			trim: true,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			trim: true,
			allowNull: false,
		},
		roleId: {
			type: Sequelize.BIGINT,
			allowNull: false,
			defaultValue: 1,
		},
	});

	return User;
};
