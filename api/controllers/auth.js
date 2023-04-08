import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/Users.js";

export const signup = async (req, res) => {
	const { firstName, lastName, email, password, rates } = req.body;

	try {
		const user = await UserModel.findOne({ email }, null, { timeout: 50000 });
		if (user) return res.status(400).json({ message: "User already exists" });

		const passRemoveWhite = password.replace(/\s/g, "");
		const hashedPassword = await bcrypt.hash(passRemoveWhite, 12);

		const newUser = new UserModel({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			rates,
		});

		await newUser.save();
		res.status(200).json({ newUser, message: "User created successfully" });
	} catch (err) {
		return res.status(401).json({ message: "Something went wrong" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password)
			return res.status(401).json({ message: "Please fill all the fields" });

		const user = await UserModel.findOne({ email });
		if (!user) return res.status(401).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res
				.status(401)
				.json({ message: "Username or password incorrect" });

		const token = jwt.sign({ userID: user._id }, "secret");
		res.status(200).json({
			token,
			userID: user._id,
			message: "User logged in successfully",
		});
		console.log("User successfully login");
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};
