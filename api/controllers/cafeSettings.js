import { CafeModel } from "../models/Cafes.js";
import { UserModel } from "../models/Users.js";

//get all cafes
export const getAllCafes = async (req, res) => {
	try {
		const cafe = await CafeModel.find({});
		return res.status(200).json(cafe);
	} catch (err) {
		return res.status(404).json({ message: "Error fetching data" });
	}
};

//get the top 5 cafes
export const getTopCafe = async (req, res) => {
	//we have to traverse first all the data inside the database
	const topCafes = await CafeModel.find({}, null, { timeout: 80000 })
		//then we have to sort the data by the totalRatings
		.then((cafes) => {
			//in descending order and get only the top 5 cafes
			return cafes.sort((a, b) => b.averageRate - a.averageRate).slice(0, 5);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ message: "Internal server error" });
		});
	res.json(topCafes);
};

//get specific cafe
export const getCafe = async (req, res) => {
	try {
		const cafe = await CafeModel.findById(req.params.id);
		if (!cafe) return res.status(404).json({ message: "Could'nt find cafe" });
		return res.status(200).json(cafe);
	} catch (err) {
		return res.status(400).json({ message: "Couldn't retrieve cafe" });
	}
};

//create cafe
export const createCafe = async (req, res) => {
	const { name, desc, address, logo, image } = req.body;
	const cafe = await CafeModel.findOne({ name });
	if (cafe) res.status(404).json({ message: "Cafe already exists" });

	try {
		const newCafe = new CafeModel({
			name,
			desc,
			address,
			logo,
			image,
		});
		await newCafe.save();
		res.json(newCafe);
	} catch (err) {
		return res.status(401).json({ err, message: "Something went wrong" });
	}
};

//favourite a cafe
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

//rate a cafe
export const rateCafe = async (req, res) => {
	try {
		//I have to get the user id from the request user object
		//by passing it to the req.body :D
		const { userId, rate, comment } = req.body; // get the rate and comment from the request body

		//get the current id of the cafe
		const cafeId = req.params.id;

		const cafe = await CafeModel.findById(cafeId); // find the cafe by its id
		if (!cafe) return res.status(404).json(cafeId); // if the cafe doesn't exist, return an error response

		const user = await UserModel.findById(userId); // find the user by their id
		if (!user) return res.status(404).json({ message: "User not found" }); // if the user doesn't exist, return an error response

		// check if the user has already rated this cafe
		//mapping through the entire list of cafe's ids that the user has already rated
		//and checks if the ids of the cafe is same with the currently selected cafe
		const userRate = user.rates.find((rate) => rate.cafeId == cafeId);

		const userName = user.firstName + " " + user.lastName;

		if (userRate)
			return res
				.status(404)
				.json({ message: "You have already rated this cafe", disabled: true }); // if the user has already rated this cafe, return an error response

		comment ? (user.numberOfReviews += 1) : null; // increment the number of reviews for the user

		user.rates.push({
			cafeId: cafe._id,
			cafeName: cafe.name,
			cafeLogo: cafe.logo,
			rate,
			comment,
			date: new Date(),
		}); // add the new rate and comment to the user's rates array
		user.numberOfRatings += 1; // increment the number of ratings for the user
		await user.save(); // save the user document to the database

		cafe.raters.push({
			userId,
			userName,
			userImage: user.profilePic,
			rate,
			comment,
			date: new Date(),
		}); // add the new rate and comment to the cafe's ratings array
		cafe.numberOfRaters += 1; // increment the number of raters for the cafe
		cafe.averageRate =
			(cafe.averageRate * cafe.numberOfRaters + rate) /
			(cafe.numberOfRaters + 1); // calculate the new average rating for the cafe
		await cafe.save(); // save the cafe document to the database

		res.json({ cafe, user }); // return a success response with the updated cafe and user documents
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" }); // return a generic error response for any other errors
	}
};

export const faveCafes = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user_id);
		return res.json(user.faveCafes);
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" }); // return a generic error response for any other errors
	}
};

//unfavorite and favorite cafe
export const addRemoveFavCafes = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user_id);

		if (!user) {
			throw new Error("User not found", { cause: { code: 404 } });
		}

		if (req.body.is_deleting) {
			user.faveCafes = user.faveCafes.filter(
				(cafe) => cafe.cafeId._id.toString() !== req.body.cafe_id
			);
		} else {
			user.faveCafes.push({
				cafeId: req.body.cafe_id,
			});
		}

		await user.save();

		return res.status(204).end();
	} catch (err) {
		console.log(err);
		if (err.code === 404) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(500).json({ message: "Internal server error" }); // return a generic error response for any other errors
	}
};
