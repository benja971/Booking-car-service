module.exports = (sequelize, Sequelize) => {
	const Car = sequelize.define('car', {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
		},
		brand: {
			type: Sequelize.STRING,
			allowNull: false,
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
		exposition_color: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		numberplate: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		doors: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		motorization: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		energy: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		notation: {
			type: Sequelize.DECIMAL(2, 1),
			allowNull: false,
			defaultValue: 0,
		},
	});

	return Car;
};
