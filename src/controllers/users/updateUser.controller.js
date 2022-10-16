import { user as Users } from "../../models";

export default async function updateUser(req, res) {
	const { id } = req.params;
	const { name } = req.body;

	if (!id) return res.status(400).send({ message: "Id is required" });

	if (isNaN(id)) return res.status(400).send({ message: "Id must be a number" });

	if (!name) return res.status(400).send({ message: "Name is required" });

	if (typeof name !== "string") return res.status(400).send({ message: "Name must be a string" });

	try {
		await Users.update({ name }, { where: { id } });
		return res.status(200);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}
