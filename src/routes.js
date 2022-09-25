const createCar = require("./controllers/cars/createCar.controller");
const updateCar = require("./controllers/cars/updateCar.controller");
const deleteCar = require("./controllers/cars/deleteCar.controller");
const { readCars, readCar } = require("./controllers/cars/readCars.controller");

const createUser = require("./controllers/users/createUser.controller");
const updateUser = require("./controllers/users/updateUser.controller");
const deleteUser = require("./controllers/users/deleteUser.controller");
const { readUsers, readUser } = require("./controllers/users/readUsers.controller");

const createResa = require("./controllers/reservations/createResa.controller");
const updateResa = require("./controllers/reservations/updateResa.controller");
const deleteResa = require("./controllers/reservations/deleteResa.controller");
const { readResas, readResa } = require("./controllers/reservations/readResas.controller");

function routes(app) {
	app.post("/car", createCar);
	app.patch("/car/update/:id", updateCar);
	app.delete("/car/delete/:id", deleteCar);
	app.get("/cars", readCars);
	app.get("/car/:id", readCar);

	app.post("user", createUser);
	app.patch("user/update/:id", updateUser);
	app.delete("user/delete/:id", deleteUser);
	app.get("users", readUsers);
	app.get("user/:id", readUser);

	app.post("/reservation", createResa);
	app.patch("/reservation/update/:id", updateResa);
	app.delete("/reservation/delete/:id", deleteResa);
	app.get("/reservations", readResas);
	app.get("/reservation/:id", readResa);
}

module.exports = routes;
