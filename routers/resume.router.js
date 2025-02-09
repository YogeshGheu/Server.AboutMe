import express from "express";
import {
	addJobDetails,
	getJobDetails,
	addPersonalDetails,
	addContactDetails,
	getPersonalDetails,
	getContactDetails,
	addSkills,
	getSkills,
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
resumeRouter.route("/data/get/personal-details").post(getPersonalDetails);

// add and get job details
resumeRouter.route("/data/add/job-profile").post(addJobDetails);
resumeRouter.route("/data/get/job-profile").post(getJobDetails);

// add and get contact details
resumeRouter.route("/data/add/contact-details").post(addContactDetails);
resumeRouter.route("/data/get/contact-details").post(getContactDetails);

// add and get skills
resumeRouter.route("/data/add/skills").post(addSkills);
resumeRouter.route("/data/get/skills").post(getSkills);

export { resumeRouter };
