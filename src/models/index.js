const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");

const { encodeImageToBase64 } = require("../controllers/images/images.utilities.js");

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
		await db.Car.create({
			brand: "Audi",
			model: "A3",
			year: 2019,
			color: "black",
			price: 200,
			exposition_color: "#000000",
			numberplate: "AA-123-AA",
			doors: 5,
			motorization: "1.6 TDI",
			energy: "diesel",
		});

		await db.Car.create({
			brand: "Audi",
			model: "A4",
			year: 2019,
			color: "black",
			price: 200,
			exposition_color: "#000000",
			numberplate: "BB-258-BB",
			doors: 5,
			motorization: "2.0 TDI",
			energy: "diesel",
		});

		await db.Car.create({
			brand: "Renault",
			model: "Clio",
			year: 2019,
			color: "white",
			price: 100,
			exposition_color: "#ffffff",
			numberplate: "CC-369-CC",
			doors: 3,
			motorization: "1.2 TDI",
			energy: "diesel",
		});

		db.Reservation.create({
			userId: 2,
			carId: 1,
			startDate: new Date().addDays(1),
			endDate: new Date().addDays(16),
		});

		db.Image.create({
			carId: 3,
			name: "Rclio_blanche_01.jpg",
			base64: encodeImageToBase64(
				fs.readFileSync("/code/public/assets/images/cars/Rclio_blanche_01.jpg")
			),
		});

		console.log("Database & tables created!");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = db;
