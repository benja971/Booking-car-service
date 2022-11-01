const fs = require("fs");

function encodeImageToBase64(buffer) {
	return Buffer.from(buffer).toString("base64");
}

function decodeBase64ToImage(base64, path) {
	const image = Buffer.from(base64, "base64");
	fs.writeFileSync(path, image);
}

module.exports = { encodeImageToBase64, decodeBase64ToImage };
