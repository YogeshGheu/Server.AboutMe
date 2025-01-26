import express from "express";
import { collectUserDataAndSendOtp, verifyOtpAndCreateUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { sendForgotPasswordOtp, verifyForgotPasswordOtp } from "../utils/forgotPassword.js";

const userRouter = express.Router();

userRouter.route("/data/collect").post(collectUserDataAndSendOtp);
userRouter.route("/verify/create").post(verifyOtpAndCreateUser);

userRouter.route("/password/reset/request").post(sendForgotPasswordOtp);
userRouter.route("/password/reset/verify").post(verifyForgotPasswordOtp);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);



export { userRouter };
