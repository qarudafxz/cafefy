import express from "express";
import { rateCafe } from "../helpers/rateCafe.js";
import { createCafe } from "../controllers/createCafe.js";

const router = express.Router();

router.post("/create-cafe", createCafe);
router.post("/rate/:id", rateCafe);

export { router as cafeRouter };
