import express from "express";
import { getChannelInfo, getVideos } from "../controllers/youTube.controller.js";

const youTubeRouter = express.Router();

youTubeRouter.route("/channel").post(getChannelInfo);
youTubeRouter.route("/videos").post(getVideos);

export { youTubeRouter };
