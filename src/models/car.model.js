module.exports = (sequelize, Sequelize) => {
	const Car = sequelize.define("car", {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
		},
		brand: {
			type: Sequelize.STRING,
			notNull: true,
			trim: true,
		},
		model: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		year: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		color: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		price: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	});

	return Car;
};
