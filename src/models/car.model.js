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
			type: Sequelize.INTEGER,
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
		notation_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false,
			trim: true,
		},
		text_color: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		design_title: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		design_description: {
			type: Sequelize.TEXT,
			allowNull: false,
			trim: true,
		},
		equipment_title: {
			type: Sequelize.STRING,
			allowNull: false,
			trim: true,
		},
		equipment_description: {
			type: Sequelize.TEXT,
			allowNull: false,
			trim: true,
		},
	});

	return Car;
};

// TODO: add the following fields to the car model

// - text_color
// - desing title
// - desing description
// - equipment title
// - equipment description
