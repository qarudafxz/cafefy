import { UserModel } from "../models/Users.js";

export const editProfile = async (req, res) => {
	const { imageLink, bgLink, bio } = req.body;
	const userId = req.params.id;

	try {
		const user = await UserModel.findByIdAndUpdate(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		user.profilePic = imageLink;
		user.bgCover = bgLink;
		user.bio = bio;

		await user.save();
		res.status(200).json({ user, message: "Profile updated successfully" });
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};
