import express from "express";
import {
	signup,
	login,
	authenticate,
	generateOTP,
} from "../controllers/auth.js";

import { checkGoogleUser } from "../controllers/checkGoogleUser.js";
import { checkAuthentication } from "../middlewares/checkAuthentication.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", checkAuthentication, login);
router.post("/authenticate", authenticate);
router.post("/googleSignup", checkGoogleUser);
router.get("/generateOTP", generateOTP);

export { router as authRouter };
