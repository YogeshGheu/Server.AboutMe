import express from "express";
import { collectUserDataAndSendOtp, verifyOtpAndCreateUser, loginUser, logoutUser, getUser } from "../controllers/user.controller.js";
import { sendForgotPasswordOtp, verifyForgotPasswordOtp } from "../utils/forgotPassword.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const userRouter = express.Router();


userRouter.route("/data/collect").post(collectUserDataAndSendOtp);
userRouter.route("/verify/create").post(verifyOtpAndCreateUser);

userRouter.route("/password/reset/request").post(sendForgotPasswordOtp);
userRouter.route("/password/reset/verify").post(verifyForgotPasswordOtp);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

// using the token verification middleware to chek if the user is logged in or not.
userRouter.use("/get-user", verifyToken)

userRouter.route("/get-user").post(getUser)

export { userRouter };
