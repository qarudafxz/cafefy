import express from "express";
import { getName } from "../helpers/getName.js";
import { editProfile } from "../controllers/editProfile.js";
import { getUserById } from "../helpers/getUserById.js";

const router = express.Router();

router.get("/name/:id", getName);
router.get("/profile/:id", getUserById);
router.put("/account-settings/:id", editProfile);

export { router as userRouter };
