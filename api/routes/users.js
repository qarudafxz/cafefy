import express from "express";
import {
	getName,
	editProfile,
	getUserById,
} from "../controllers/userSettings.js";

const router = express.Router();

router.get("/name/:id", getName);
router.get("/profile/:id", getUserById);
router.put("/account-settings/:id", editProfile);

export { router as userRouter };
