import createCar from "./controllers/cars/createCar.controller.js";
import updateCar from "./controllers/cars/updateCar.controller.js";
import deleteCar from "./controllers/cars/deleteCar.controller.js";
import readCarsController from "./controllers/cars/readCars.controller.js";
const { readCars, readCar } = readCarsController;

import createUser from "./controllers/users/createUser.controller.js";
import updateUser from "./controllers/users/updateUser.controller.js";
import deleteUser from "./controllers/users/deleteUser.controller.js";
import readUserController from "./controllers/users/readUsers.controller.js";
const { readUsers, readUser } = readUserController;

import createResa from "./controllers/reservations/createResa.controller.js";
import updateResa from "./controllers/reservations/updateResa.controller.js";
import deleteResa from "./controllers/reservations/deleteResa.controller.js";
import readResasController from "./controllers/reservations/readResas.controller.js";
const { readResas, readResa } = readResasController;

import login from "./controllers/tokens/login.controller.js";
import verifyOwner from "./middlewares/verifyOwner.middleware.js";
import verifyUser from "./middlewares/verifyUser.middleware.js";
import verifyTokenController from "./middlewares/verifyToken.middleware.js";
const { verifyToken, verifyAdmin } = verifyTokenController;

/**
 * @param {Express.Application} app
 */
export default function routes(app) {
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
}
