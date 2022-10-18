export default (sequelize, Sequelize) => {
	const Reservation = sequelize.define("reservation", {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
		},
		userId: {
			type: Sequelize.BIGINT,
			notNull: true,
		},
		carId: {
			type: Sequelize.BIGINT,
			notNull: true,
		},
		startDate: {
			type: Sequelize.DATE,
			notNull: true,
		},
		endDate: {
			type: Sequelize.DATE,
			notNull: true,
		},
	});

	return Reservation;
};
