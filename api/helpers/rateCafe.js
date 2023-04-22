import { CafeModel } from "../models/Cafes.js";
import { UserModel } from "../models/Users.js";

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
		const userImg = user.profilePic;

		if (userRate)
			return res
				.status(404)
				.json({ message: "You have already rated this cafe" }); // if the user has already rated this cafe, return an error response

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
		cafe.averageRate = (cafe.averageRate + rate) / cafe.numberOfRaters; // calculate the new average rating for the cafe
		await cafe.save(); // save the cafe document to the database

		res.json({ cafe, user }); // return a success response with the updated cafe and user documents
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" }); // return a generic error response for any other errors
	}
};
