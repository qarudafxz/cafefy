export const checkAuthentication = async (req, res, next) => {
	try {
		const { username } = req.method === "GET" ? req.query : req.body;

		//check the user existence
		const userExist = await UserModel.findOne({ username });
		if (!userExist) return res.status(404).send({ message: "User not found" });
		next();
	} catch (err) {
		return res.status(401).send({ message: "Authentication error" });
	}
};
