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
		name: {
			type: Sequelize.STRING,
			notNull: true,
		},
		base64: {
			// TODO: make it an url to the image on the server
			type: Sequelize.TEXT('long'),
			notNull: true,
		},
	});

	return Image;
};
