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

const login = require("./controllers/tokens/login.controller");
const { verifyToken, verifyAdmin } = require("./middlewares/verifyToken.middleware");
const verifyOwner = require("./middlewares/verifyOwner.middleware");
const verifyUser = require("./middlewares/verifyUser.middleware");

/**
 * @param {Express.Application} app
 */
module.exports = function routes(app) {
	app.post("/car", [verifyToken, verifyAdmin], createCar);
	app.patch("/cars/update/:id", [verifyToken, verifyAdmin], updateCar);
	app.delete("/cars/delete/:id", [verifyToken, verifyAdmin], deleteCar);
	app.get("/cars", [verifyToken, verifyAdmin], readCars);
	app.get("/cars/:id", verifyToken, readCar);

	app.post("/user", createUser);
	app.patch("/users/update/:id", [verifyToken, verifyUser], updateUser);
	app.delete("/users/delete/:id", [verifyToken, verifyUser], deleteUser);
	app.get("/users", [verifyToken, verifyAdmin], readUsers);
	app.get("/users/:id", [verifyToken, verifyUser], readUser);

	app.post("/reservations", verifyToken, createResa);
	app.patch("/reservations/update/:id", [verifyToken, verifyOwner], updateResa);
	app.delete("/reservations/delete/:id", [verifyToken, verifyOwner], deleteResa);
	app.get("/reservations", [verifyToken, verifyAdmin], readResas);
	app.get("/reservations/:id", [verifyToken, verifyOwner], readResa);

	app.post("/login", login);
};
