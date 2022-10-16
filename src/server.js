const express = require("express");
const compression = require("compression");

require("dotenv").config();

const routes = require("./routes");
/**
 * @type {express.Application}
 */
const app = express();

Date.prototype.addDays = function (days) {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

routes(app);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
