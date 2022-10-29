const express = require("express");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");

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
app.use(fileUpload());
app.use(compression());

app.use(
	cors({
		origin: "*",
	})
);

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
});

routes(app);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
