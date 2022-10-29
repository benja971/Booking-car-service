const fs = require("fs");

const {Image} = require("../../models");

/**
 * Add a new image of a car to the database
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createImage(req, res) {
	/**
	 * @type {{id: number}} req.params
	 */
	const {id: carId} = req.params;

	/**
	 * @type {{name: string}} req.body
	 */
	const {name} = req.body;

	/**
	 * @type {{file: File}} req.files
	 */
	const {file} = req?.files;

	try {
		const ext = file.name.split(".").pop();
		const path = `./public/assets/images/cars/`;

		// save the image locally
		fs.writeFileSync(`${path}${name}.${ext}`, file.data);

		/**
		 * @typedef {{id: number, carId: number, name: string, path: string}} Image
		 * @type {Image} image
		 */
		const image = await Image.create({
			name,
			carId,
		});
	} catch (error) {
		// delete the image from the server
		// only if it was saved locally
		if (fs.existsSync(path)) fs.unlinkSync(path);

		res.status(500).send({message: "Internal Server Error"});
	}

	res.status(201).send({message: "Image created successfully"});
}

module.exports = createImage;
