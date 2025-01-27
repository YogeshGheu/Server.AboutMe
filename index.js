import express from "express";
import "dotenv/config";
import { connectDB } from "./database/connectDB.js";
import { User } from "./models/user.model.js";
import ApiError from "./utils/APIerror.js";
import { userRouter } from "./routers/user.router.js";
import { sendOtp } from "./services/emailOtp.service.js";
import axios from "axios";
import {youTubeRouter} from "./routers/youTube.router.js"
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();
const port = process.env.PORT || 3000;

// enable JSON body parsing
app.use(express.json());

// enable cookie parsing
app.use(cookieParser())

app.use("/app/user/youtube", verifyToken)

// connect the app to DB
const DB_URL = process.env.DB_URL;
connectDB(DB_URL);

// using routes
app.use("/app/api/user", userRouter);
app.use("/app/user/youtube", youTubeRouter)

// requests
app.get("/", async (req, res) => {
	return res.json({ message: "hello" });
});

app.listen(port, () => {
	console.log(`AboutMe app listening on port ${port}`);
});
