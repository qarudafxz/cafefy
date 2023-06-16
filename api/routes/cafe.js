import express from "express";
import {
	rateCafe,
	createCafe,
	getTopCafe,
	getCafe,
	getAllCafes,
	faveCafe,
	faveCafes,
	addRemoveFavCafes,
	deleteRate,
} from "../controllers/cafeSettings.js";

const router = express.Router();

router.post("/create-cafe", createCafe);
router.post("/rate/:id", rateCafe);
router.post("/fave-cafe/:id", faveCafe);
router.post("/fave-cafes", faveCafes);
router.post("/update-fav-cafes", addRemoveFavCafes);

router.get("/", getAllCafes);
router.get("/top-cafe", getTopCafe);
router.get("/cafe/:id", getCafe);

router.delete("/cafe/delete", deleteRate);
export { router as cafeRouter };
