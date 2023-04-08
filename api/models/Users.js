import mongoose from "mongoose";

const collectionName = "users";

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		rates: [
			{
				cafeId: {
					type: mongoose.Types.ObjectId,
					refs: "cafes",
					required: true,
				},
				rate: { type: Number },
				comment: { type: String, max_length: 125 },
				date: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

export const UserModel = mongoose.model(collectionName, UserSchema);
