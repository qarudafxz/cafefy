import express from "express";
import { rateCafe } from "../helpers/rateCafe.js";
import { createCafe } from "../controllers/createCafe.js";
import { getTopCafe } from "../controllers/getTopCafe.js";
import { getCafe } from "../controllers/getCafe.js";

const router = express.Router();

router.post("/create-cafe", createCafe);
router.post("/rate/:id", rateCafe);
router.get("/top-cafe", getTopCafe);
router.get("/cafe/:id", getCafe);

export { router as cafeRouter };
