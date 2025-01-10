import express from "express";
import "dotenv/config";
import { connectDB } from "./database/connectDB.js";
import { User } from "./models/user.model.js";
import ApiError from "./utils/APIerror.js";
import { userRouter } from "./routers/user.router.js";
import { sendOtp } from "./services/emailOtp.service.js";

const app = express();
const port = process.env.PORT || 3000;

// enable JSON body parsing
app.use(express.json());

// connect the app to DB
const DB_URL = process.env.DB_URL;
connectDB(DB_URL);

// using routes
app.use("/api/user", userRouter);

// requests 
app.get("/", (req, res) => {
	res.send("Server is Ready ...");
});

app.listen(port, () => {
	console.log(`AboutMe app listening on port ${port}`);
});
