import express from "express";
import { addDataInResume } from "../controllers/resume.controller.js";

const resumeRouter = express.Router();

resumeRouter.route("/data/add").post(addDataInResume);

export { resumeRouter };
