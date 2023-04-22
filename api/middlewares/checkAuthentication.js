import { UserModel } from "../models/Users.js";

export const checkAuthentication = async (req, res, next) => {
	try {
		const { email } = req.method === "GET" ? req.query : req.body;

		//check the user existence
		const userExist = await UserModel.findOne({ email });
		if (!userExist) return res.status(404).send({ message: "User not found" });

		next();
	} catch (err) {
		console.log(err);
		return res.status(401).send({ message: "Authentication error" });
	}
};
