import db_config from "../config/db.config.js";
import { Sequelize } from "sequelize";

import User from "./user.model.js";
import Role from "./role.model.js";
import Car from "./car.model.js";
import Reservation from "./resa.model.js";

const { HOST, USER, PASSWORD, DB, port, dialect, pool } = db_config;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
	host: HOST,
	dialect: dialect,
	port: port,
	// logging: false,
	pool: {
		max: pool.max,
		min: pool.min,
		acquire: pool.acquire,
		idle: pool.idle,
	},
});

const db = {
	sequelize,
	Sequelize,
	User: User(sequelize, Sequelize),
	Role: Role(sequelize, Sequelize),
	Car: Car(sequelize, Sequelize),
	Reservation: Reservation(sequelize, Sequelize),
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

export default db;
