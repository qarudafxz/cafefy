import { UserModel } from "../models/Users.js";

//get the user by id
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

//get the name of the user
export const getName = async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		if (!user) res.status(404).json({ message: "User not found" });

		res.json(user.firstName);
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};

//edit profile of the user
export const editProfile = async (req, res) => {
	const { imageLink, bgLink, bio } = req.body;

	try {
		const user = await UserModel.findByIdAndUpdate(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });

		const updatedUser = await user.updateOne({
			$set: {
				profilePic: imageLink,
				bgCover: bgLink,
				bio: bio,
			},
		});
		await updatedUser.save();
		res.status(200).json({ user, message: "Profile updated successfully" });
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};
