import { CafeModel } from "../models/Cafes.js";

export const getTopCafe = async (req, res) => {
	//we have to traverse first all the data inside the database
	const topCafes = await CafeModel.find({}, null, { timeout: 80000 })
		//then we have to sort the data by the totalRatings
		.then((cafes) => {
			//in descending order and get only the top 5 cafes
			return cafes.sort((a, b) => b.totalRatings - a.totalRatings).slice(0, 5);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ message: "Internal server error" });
		});
	res.json(topCafes);
};
