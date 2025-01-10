import express from "express";
import { collectUserDataAndSendOtp, verifyOtpAndCreateUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/data/collect").post(collectUserDataAndSendOtp);
userRouter.route("/verify/create").post(verifyOtpAndCreateUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);


export { userRouter };
