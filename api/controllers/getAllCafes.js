import { CafeModel } from "../models/Cafes.js";

export const getAllCafes = async (req, res) => {
	try {
		const cafe = await CafeModel.find({});
		return res.status(200).json(cafe);
	} catch (err) {
		return res.status(404).json({ message: "Error fetching data" });
	}
};
