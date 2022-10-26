const fs = require("fs");

const { Image } = require("../../models");

/**
 * Add a new image of a car to the database
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createImage(req, res) {
	/**
	 * @typedef {{name: string, carId: number}} image
	 * @type {image} req.body
	 */
	const { name, carId } = req.body;

	const { file } = req?.files;

	const ext = file.name.split(".").pop();
	const path = `./public/assets/images/cars/${name}.${ext}`;

	try {
		// save the image locally
		fs.writeFileSync(path, file.data);

		/**
		 * @type {image} image
		 */
		const image = await Image.create({
			name,
			carId,
		});
	} catch (error) {
		// delete the image from the server
		// only if it was saved locally
		if (fs.existsSync(path)) fs.unlinkSync(path);

		res.status(500).send({ message: "Internal Server Error" });
	}

	res.status(201).send({ message: "Image created successfully" });
}

module.exports = createImage;
