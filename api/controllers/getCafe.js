import { CafeModel } from "../models/Cafes.js";

export const getCafe = async (req, res) => {
	try {
		const cafe = await CafeModel.findById(req.params.id);
		if (!cafe) return res.status(404).json({ message: "Could'nt find cafe" });
		return res.status(200).json(cafe);
	} catch (err) {
		return res.status(400).json({ message: "Couldn't retrieve cafe" });
	}
};
