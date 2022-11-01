const fs = require("fs");

const { Image } = require("../../models");

const { encodeImageToBase64 } = require("./images.utilities");

/**
 * Add a new image of a car to the database
 * turn the image into a base64 string
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createImage(req, res) {
	/**
	 * @type {{id: number}} req.params
	 */
	const { id: carId } = req.params;

	/**
	 * @type {{name: string}} req.body
	 */
	const { name } = req.body;

	/**
	 * @type {{file: File}} req.files
	 */
	const { file } = req?.files;

	if (!(name && carId && file))
		return res.status(400).json({ message: "Missing required fields" });

	try {
		const image = await Image.create({
			name,
			carId,
			base64: encodeImageToBase64(file.data),
		});

		console.log(image);

	} catch (error) {
		res.status(500).send(error);
	}

	res.status(201).send({ message: "Image saved succesfully" });
}

module.exports = createImage;