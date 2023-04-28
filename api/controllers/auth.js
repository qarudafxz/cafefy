import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

//create user
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
			bio: `👋 Nice to meet you here on Cafefy! I'm ${firstName} ${lastName}`,
			rates,
		});

		await newUser.save();
		res.status(200).json({ newUser, message: "User created successfully" });
		res.redirect("/login");
	} catch (err) {
		return res.status(401).json({ message: "Something went wrong" });
	}
};

//authenticate
export const authenticate = async (req, res) => {};

//login user
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

		const token = jwt.sign(
			{ userID: user._id, username: user.username },
			"secret",
			{ expiresIn: "5m" }
		);

		res.status(200).json({
			token,
			username: user.firstName + " " + user.lastName,
			userID: user._id,
			message: "User logged in successfully",
		});
		console.log("User successfully login");
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};

//generate On time password
export const generateOTP = async (req, res) => {};

const googleLogin = (user, res) => {
	const token = jwt.sign({ userID: user._id }, "secret");
	res.status(200).json({ token, user });
};

//check if the user is authenticated using google login
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
