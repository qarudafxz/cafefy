import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const googleLogin = (user, res) => {
	const token = jwt.sign({ userID: user._id }, "secret");
	res.status(200).json({ token, user });
};

export const checkGoogleUser = async (req, res) => {
	const { firstName, lastName, email, password, profilePic } = req.body;
	try {
		let user = await UserModel.findOne({ email });

		//if user doesn't exist, add the gmail account in the database
		if (!user) {
			try {
				user = new UserModel({
					firstName,
					lastName,
					email,
					password: await bcrypt.hash(password, 10),
					profilePic,
					bio: `👋 Nice to meet you here on Cafefy! I'm ${firstName} ${lastName}`,
				});

				await user.save();
				googleLogin(user, res);
			} catch (err) {
				console.log(err);
			}
		}

		//if user exists, log the user in
		googleLogin(user, res);
	} catch (err) {
		console.log(err);
	}
};
