import { UserModel } from "../models/Users.js";

export const getName = async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		if (!user) res.status(404).json({ message: "User not found" });

		res.json(user.firstName);
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};
