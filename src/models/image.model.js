module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define('image', {
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
		url: {
			type: Sequelize.STRING,
			notNull: true,
			trim: true,
		},
	});

	return Image;
};
