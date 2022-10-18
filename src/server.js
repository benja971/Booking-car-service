import express from "express";
import compression from "compression";
import { hash } from "bcrypt";

import { config } from "dotenv";
config();

import db from "./models/index.js";
const { sequelize, User, Role, Car, Reservation } = db;

import routes from "./routes.js";

/**
 * @type {express.Application}
 */
const app = express();

Date.prototype.addDays = function (days) {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

sequelize
	.sync({ force: true })
	.then(async () => {
		// create roles
		Role.create({
			name: "user",
		});

		Role.create({
			name: "admin",
		});

		// create users
		User.create({
			name: "john",
			email: "john@gmail.com",
			password: await hash("user", 10),
			roleId: 1,
		});

		User.create({
			name: "jane",
			email: "jane@gmail.com",
			password: await hash("user", 10),
			roleId: 1,
		});

		User.create({
			name: "jack",
			email: "jack@gmail.com",
			password: await hash("user", 10),
			roleId: 1,
		});

		User.create({
			name: "admin",
			email: "arandomadmin@gmail.com",
			password: await hash("admin", 10),
			roleId: 2,
		});

		// create cars
		Car.create({
			brand: "Audi",
			model: "A3",
			year: 2019,
			color: "black",
			price: 200,
		});

		Car.create({
			brand: "Audi",
			model: "A4",
			year: 2019,
			color: "black",
			price: 200,
		});

		Car.create({
			brand: "Renault",
			model: "Clio",
			year: 2019,
			color: "black",
			price: 100,
		});

		Reservation.create({
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

routes(app);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
