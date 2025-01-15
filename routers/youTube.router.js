import express from "express";
import { getChannelInfo } from "../controllers/youTube.controller.js";

const youTubeRouter = express.Router();

youTubeRouter.route("/channel").post(getChannelInfo);

export { youTubeRouter };
