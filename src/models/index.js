const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const cars = require('../../cars.json');
const users = require('../../users.json');

const { encodeImageToBase64 } = require('../controllers/images/images.utilities.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	port: config.port,
	logging: false,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
});

const db = {
	sequelize,
	Sequelize,
	User: require('./user.model.js')(sequelize, Sequelize),
	Role: require('./role.model.js')(sequelize, Sequelize),
	Car: require('./car.model.js')(sequelize, Sequelize),
	Reservation: require('./resa.model.js')(sequelize, Sequelize),
	Image: require('./image.model.js')(sequelize, Sequelize),
};

// there is a user in a reservation
db.Reservation.belongsTo(db.User, {
	foreignKey: 'userId',
});

// there is a car in a reservation
db.Reservation.belongsTo(db.Car, {
	foreignKey: 'carId',
});

// there is a role in a user
db.User.belongsTo(db.Role, {
	foreignKey: 'roleId',
});

// cars have many images
db.Car.hasMany(db.Image, {
	foreignKey: 'carId',
});

// delete all reservations when a user is deleted
db.User.hasMany(db.Reservation, {
	foreignKey: 'userId',
	onDelete: 'cascade',
});

// delete all reservations when a car is deleted
db.Car.hasMany(db.Reservation, {
	foreignKey: 'carId',
	onDelete: 'cascade',
});

// delete all users when a role is deleted
db.Role.hasMany(db.User, {
	foreignKey: 'roleId',
	onDelete: 'cascade',
});

// delete all images when a car is deleted
db.Car.hasMany(db.Image, {
	foreignKey: 'carId',
	onDelete: 'cascade',
});

db.sequelize
	.sync({
		force: true,
	})
	.then(async () => {
		// create roles
		db.Role.create({
			name: 'user',
		});

		db.Role.create({
			name: 'admin',
		});

		// create users
		for (const user of users) {
			user.password = await bcrypt.hash(user.password, 10);
			await db.User.create(user);
		}

		// create cars
		for (const car of cars) {
			car.notation = Math.random() * 5;
			car.year = Math.floor(Math.random() * 10) + 2010;

			await db.Car.create(car);
		}

		// create images for cars
		fs.readFile('/code/public/assets/images/cars/CLIO_presentation2.png')
			.then(async image => {
				for (let i = 0; i < cars.length; i++) {
					await db.Image.create({
						carId: i + 1,
						name: 'CLIO_presentation.png',
						base64: encodeImageToBase64(image),
					});
				}
			})
			.catch(err => console.log(err));

		db.Reservation.create({
			userId: 2,
			carId: 1,
			startDate: new Date().addDays(1),
			endDate: new Date().addDays(16),
		});

		console.log('Database & tables created!');
	})
	.catch(err => {
		console.log(err);
	});

module.exports = db;
