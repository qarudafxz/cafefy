import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/auth.js";

dotenv.config();

const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cafefy.asd3jbj.mongodb.net/cafefy?retryWrites=true&w=majority`;
const app = express();

//middlewares
app.use(express.json());
app.use(
	cors({
		credentials: true,
	})
);

//routers
app.use("/auth", userRouter);

mongoose
	.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connection Established"))
	.catch((err) => console.log(err));

export default app;
