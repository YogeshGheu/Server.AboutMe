import express from "express";
import {
	addPersonalDetails,
	addContactDetails,
	getPersonalDetails,
} from "../controllers/resume.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

import { upload } from "../middlewares/multer.middleware.js";

const resumeRouter = express.Router();
resumeRouter.use(verifyToken);

// add personal data
resumeRouter
	.route("/data/add/personal-details")
	.post(upload.single("photo"), addPersonalDetails);

//get personl details 
resumeRouter.route("/data/get/personal-details").post(getPersonalDetails)

// add contach details
resumeRouter.route("/data/add/contact-details").post(addContactDetails);

export { resumeRouter };
