import { UserModel } from "../models/Users.js";
import { CafeModel } from "../models/Cafes.js";

export const faveCafe = async (req, res) => {
	try {
		const cafe = await CafeModel.findById(req.params.id);
		if (!cafe) return res.status(404).json({ message: "Cafe not found" });

		const user = await UserModel.find({ userID: req.body });

		user.faveCafes.push({
			cafeId: cafe._id,
			cafeName: cafe.name,
			cafeLogo: cafe.logo,
		});

		await user.save();
		return res.status(200).json({ message: "Cafe added to favorites" });
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};
