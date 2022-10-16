const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./models");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	port: config.port,
	// logging: false,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
});

/**
 * @type {{
 * 	sequelize: sequelize,
 * 	Sequelize: Sequelize,
 * 	user: sequelize.Model,
 * 	car: sequelize.Model,
 * 	reservation: sequelize.Model,
 * 	role: sequelize.Model
 * }}
 */
const db = {
	sequelize,
	Sequelize,
	user: require("./user.model.js")(sequelize, Sequelize),
	role: require("./role.model.js")(sequelize, Sequelize),
	car: require("./car.model.js")(sequelize, Sequelize),
	reservation: require("./reservation.model.js")(sequelize, Sequelize),
};

// there is a user in a reservation
db.reservation.belongsTo(db.user, {
	foreignKey: "userId",
});

// there is a car in a reservation
db.reservation.belongsTo(db.car, {
	foreignKey: "carId",
});

// there is a role in a user
db.user.belongsTo(db.role, {
	foreignKey: "roleId",
});

// delete all reservations when a user is deleted
db.user.hasMany(db.reservation, {
	foreignKey: "userId",
	onDelete: "cascade",
});

// delete all reservations when a car is deleted
db.car.hasMany(db.reservation, {
	foreignKey: "carId",
	onDelete: "cascade",
});

// delete all users when a role is deleted
db.role.hasMany(db.user, {
	foreignKey: "roleId",
	onDelete: "cascade",
});

db.sequelize
	.sync({ force: true })
	.then(async () => {
		// create roles
		db.role.create({
			name: "user",
		});

		db.role.create({
			name: "admin",
		});

		// create users
		db.user.create({
			name: "john",
			email: "john@gmail.com",
			password: await bcrypt.hash("user", 10),
			roleId: 1,
		});

		db.user.create({
			name: "jane",
			email: "jane@gmail.com",
			password: await bcrypt.hash("user", 10),
			roleId: 1,
		});

		db.user.create({
			name: "jack",
			email: "jack@gmail.com",
			password: await bcrypt.hash("user", 10),
			roleId: 1,
		});

		db.user.create({
			name: "admin",
			email: "arandomadmin@gmail.com",
			password: await bcrypt.hash("admin", 10),
			roleId: 2,
		});

		// create cars
		db.car.create({
			brand: "Audi",
			model: "A3",
			year: 2019,
			color: "black",
			price: 200,
		});

		db.car.create({
			brand: "Audi",
			model: "A4",
			year: 2019,
			color: "black",
			price: 200,
		});

		db.car.create({
			brand: "Renault",
			model: "Clio",
			year: 2019,
			color: "black",
			price: 100,
		});

		db.reservation.create({
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
