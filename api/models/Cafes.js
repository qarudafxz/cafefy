import mongoose from "mongoose";

const collectionName = "cafes";

const CafeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	image: { type: String, required: true },
	totalRatings: { type: Number, default: 0 },
	numberOfRaters: { type: Number, default: 0 },
});

export const CafeModel = mongoose.model(collectionName, CafeSchema);
