module.exports = (sequelize, Sequelize) => {
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
	});

	return User;
};
