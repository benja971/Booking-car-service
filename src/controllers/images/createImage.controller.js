const fs = require('fs');
const { Image } = require('../../models');

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

	if (!(carId && file)) return res.status(400).send({ message: 'Missing required fields' });

	// verify that the file is an image
	if (!file.mimetype.startsWith('image'))
		return res.status(400).send({ message: 'File must be an image' });

	try {
		// save the image to the server
		const baseURL = process.env.BASE_URL;
		const ext = file?.name.split('.').pop();
		const filename = `${name}.${ext}` || file.name;
		const path = `${baseURL}/assets/images/cars/${filename}`;

		fs.writeFileSync(path, file.data);

		const image = await Image.create({
			carId,
			url: path,
		});
	} catch (error) {
		res.status(500).send(error);
	}

	res.status(201).send({ message: 'Image saved succesfully' });
}

module.exports = createImage;
