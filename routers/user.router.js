import express from "express";
import { createUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/create").post(createUser);


export { userRouter };
