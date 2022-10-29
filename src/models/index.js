const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

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

/**
 * @typedef {Database} db
 * @property {sequelize} sequelize
 * @property {Sequelize} Sequelize
 * @property {sequelize.Model} User
 * @property {sequelize.Model} Car
 * @property {sequelize.Model} Reservation
 * @property {sequelize.Model} Role
 * @property {sequelize.Model} Image
 */
const db = {
	sequelize,
	Sequelize,
	User: require("./user.model.js")(sequelize, Sequelize),
	Role: require("./role.model.js")(sequelize, Sequelize),
	Car: require("./car.model.js")(sequelize, Sequelize),
	Reservation: require("./resa.model.js")(sequelize, Sequelize),
	Image: require("./image.model.js")(sequelize, Sequelize),
};

// there is a user in a reservation
db.Reservation.belongsTo(db.User, {
	foreignKey: "userId",
});

// there is a car in a reservation
db.Reservation.belongsTo(db.Car, {
	foreignKey: "carId",
});

// there is a role in a user
db.User.belongsTo(db.Role, {
	foreignKey: "roleId",
});

// cars have many images
db.Car.hasMany(db.Image, {
	foreignKey: "carId",
});

// delete all reservations when a user is deleted
db.User.hasMany(db.Reservation, {
	foreignKey: "userId",
	onDelete: "cascade",
});

// delete all reservations when a car is deleted
db.Car.hasMany(db.Reservation, {
	foreignKey: "carId",
	onDelete: "cascade",
});

// delete all users when a role is deleted
db.Role.hasMany(db.User, {
	foreignKey: "roleId",
	onDelete: "cascade",
});

// delete all images when a car is deleted
db.Car.hasMany(db.Image, {
	foreignKey: "carId",
	onDelete: "cascade",
});

db.sequelize
	.sync({
		force: true,
	})
	.then(async () => {
		// create roles
		db.Role.create({
			name: "user",
		});

		db.Role.create({
			name: "admin",
		});

		// create users
		db.User.create({
			name: "john",
			email: "john@gmail.com",
			password: await bcrypt.hash("user", 10),
			roleId: 1,
		});

		db.User.create({
			name: "jane",
			email: "jane@gmail.com",
			password: await bcrypt.hash("user", 10),
			roleId: 1,
		});

		db.User.create({
			name: "jack",
			email: "jack@gmail.com",
			password: await bcrypt.hash("user", 10),
			roleId: 1,
		});

		db.User.create({
			name: "admin",
			email: "arandomadmin@gmail.com",
			password: await bcrypt.hash("admin", 10),
			roleId: 2,
		});

		// create cars
		db.Car.create({
			brand: "Audi",
			model: "A3",
			year: 2019,
			color: "black",
			price: 200,
		});

		db.Car.create({
			brand: "Audi",
			model: "A4",
			year: 2019,
			color: "black",
			price: 200,
		});

		db.Car.create({
			brand: "Renault",
			model: "Clio",
			year: 2019,
			color: "black",
			price: 100,
		});

		db.Reservation.create({
			userId: 2,
			carId: 1,
			startDate: new Date().addDays(1),
			endDate: new Date().addDays(16),
		});

		console.log("Database & tables created!");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = db;
