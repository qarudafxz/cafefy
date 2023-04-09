import mongoose from "mongoose";

const collectionName = "cafes";

const CafeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	address: { type: String, required: true },
	image: { type: String, required: true },
	totalRatings: { type: Number, default: 0 },
	numberOfRaters: { type: Number, default: 0 },
	ratings: [
		{
			userId: {
				type: mongoose.Types.ObjectId,
				refs: "users",
			},
			userName: { type: String },
			userImage: { type: String },
			rate: { type: Number },
			comment: { type: String, max_length: 125 },
			date: { type: Date, default: Date.now },
		},
	],
});

export const CafeModel = mongoose.model(collectionName, CafeSchema);
