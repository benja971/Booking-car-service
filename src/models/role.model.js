module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define("role", {
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

	return Role;
};
