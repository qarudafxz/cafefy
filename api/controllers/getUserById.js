import { UserModel } from "../models/Users.js";

export const getUserById = async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id, null, {
			timeout: 50000,
		});

		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
