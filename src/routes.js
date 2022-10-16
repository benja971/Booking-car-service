import createCar from "./controllers/cars/createCar.controller";
import updateCar from "./controllers/cars/updateCar.controller";
import deleteCar from "./controllers/cars/deleteCar.controller";
import { readCars, readCar } from "./controllers/cars/readCars.controller";

import createUser from "./controllers/users/createUser.controller";
import updateUser from "./controllers/users/updateUser.controller";
import deleteUser from "./controllers/users/deleteUser.controller";
import { readUsers, readUser } from "./controllers/users/readUsers.controller";

import createResa from "./controllers/reservations/createResa.controller";
import updateResa from "./controllers/reservations/updateResa.controller";
import deleteResa from "./controllers/reservations/deleteResa.controller";
import { readResas, readResa } from "./controllers/reservations/readResas.controller";

import login from "./controllers/tokens/login.controller";
import { verifyToken, verifyAdmin } from "./middlewares/verifyToken.middleware";
import verifyOwner from "./middlewares/verifyOwner.middleware";
import verifyUser from "./middlewares/verifyUser.middleware";

// TODO: verify that a user can't interact with another user's reservations

/**
 * @param {Express.Application} app
 */
function routes(app) {
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

export default routes;
