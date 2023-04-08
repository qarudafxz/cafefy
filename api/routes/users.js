import express from "express";
import { getName } from "../helpers/getName.js";

const router = express.Router();

router.get("/name/:id", getName);

export { router as userRouter };
