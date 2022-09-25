module.exports = (sequelize, Sequelize) => {
	const Car = sequelize.define("car", {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
		},
		model: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
	});

	return Car;
};
