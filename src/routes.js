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

const createToken = require("./controllers/tokens/createToken.controller");
const verifyToken = require("./middlewares/verifyToken.middleware");

function routes(app) {
	app.post("/car", createCar);
	app.patch("/cars/update/:id", updateCar);
	app.delete("/cars/delete/:id", deleteCar);
	app.get("/cars", verifyToken, readCars);
	app.get("/cars/:id", readCar);

	app.post("user", createUser);
	app.patch("users/update/:id", updateUser);
	app.delete("users/delete/:id", deleteUser);
	app.get("users", readUsers);
	app.get("users/:id", readUser);

	app.post("/reservations", createResa);
	app.patch("/reservations/update/:id", updateResa);
	app.delete("/reservations/delete/:id", deleteResa);
	app.get("/reservations", readResas);
	app.get("/reservations/:id", readResa);

	app.post("/tokens", createToken);
}

module.exports = routes;
