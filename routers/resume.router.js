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
	addCertificates,
	getCertificates,
	addLanguages,
	getLanguages,
	addEducations,
	getEducations,
	addHobby,
	getHobby,
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

// add and get certificates
resumeRouter.route("/data/add/certificates").post(addCertificates);
resumeRouter.route("/data/get/certificates").post(getCertificates);

// add and get languages
resumeRouter.route("/data/add/languages").post(addLanguages);
resumeRouter.route("/data/get/languages").post(getLanguages);

// add and get educations
resumeRouter.route("/data/add/educations").post(addEducations);
resumeRouter.route("/data/get/educations").post(getEducations);

// add and get hobbies
resumeRouter.route("/data/add/hobby").post(addHobby);
resumeRouter.route("/data/get/hobby").post(getHobby);

export { resumeRouter };
