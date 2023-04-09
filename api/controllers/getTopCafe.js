import { CafeModel } from "../models/Cafes.js";

export const getTopCafe = async (req, res) => {
	//we have to traverse first all the data inside the database
	const topCafes = await CafeModel.find({}, null, { timeout: 50000 })
		//then we have to sort the data by the totalRatings
		.then((cafes) => {
			//in descending order
			cafes.sort((a, b) => b.totalRatings - a.totalRatings);
			//then grab the first 5 cafes
			return cafes.slice(0, 5);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ message: "Internal server error" });
		});
	res.json(topCafes);
};
