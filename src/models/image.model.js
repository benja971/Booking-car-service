module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define("image", {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
		},
		carId: {
			type: Sequelize.BIGINT,
			notNull: true,
		},
		name: {
			type: Sequelize.STRING,
			notNull: true,
		},
		base64: {
			type: Sequelize.TEXT,
			notNull: true,
		},
	});

	return Image;
};
