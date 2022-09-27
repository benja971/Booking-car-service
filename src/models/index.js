const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

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

const db = {
	sequelize,
	Sequelize,
};

// create tables
db.user = require("./user.model.js")(db.sequelize, db.Sequelize);
db.car = require("./car.model.js")(db.sequelize, db.Sequelize);
db.reservation = require("./resa.model.js")(db.sequelize, db.Sequelize);
db.role = require("./role.model.js")(db.sequelize, db.Sequelize);

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

module.exports = db;
