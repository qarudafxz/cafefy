import express from "express";
import {
	rateCafe,
	createCafe,
	getTopCafe,
	getCafe,
	getAllCafes,
	faveCafe,
} from "../controllers/cafeSettings.js";

const router = express.Router();

router.post("/create-cafe", createCafe);
router.post("/rate/:id", rateCafe);
router.post("/fave-cafe/:id", faveCafe);

router.get("/", getAllCafes);
router.get("/top-cafe", getTopCafe);
router.get("/cafe/:id", getCafe);

export { router as cafeRouter };
