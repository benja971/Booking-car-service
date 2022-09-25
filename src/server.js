const express = require("express");
const compression = require("compression");

const sequelize = require("sequelize");
const db = require("./models");

require("dotenv").config();

const routes = require("./routes");

const app = express();

db.sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Database & tables created!");
	})
	.catch(err => {
		console.log(err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

routes(app);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
