import mongoose from "mongoose";

const collectionName = "cafes";

const CafeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	image: { type: String, required: true },
	rates: [
		{
			userId: { type: mongoose.Types.ObjectId, refs: "users" },
			rate: { type: Number },
			comment: { type: String, max_length: 125 },
			date: { type: Date, default: Date.now },
		},
	],
	totalRatings: { type: Number, default: 0 },
});

export const CafeModel = mongoose.model(collectionName, CafeSchema);
