import { CafeModel } from "../models/Cafes.js";

export const createCafe = async (req, res) => {
	const { name, address, image } = req.body;
	const cafe = await CafeModel.findOne({ name });
	if (cafe) res.status(404).json({ message: "Cafe already exists" });

	try {
		const newCafe = new CafeModel({
			name,
			address,
			image,
		});
		await newCafe.save();
		res.json(newCafe);
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};
