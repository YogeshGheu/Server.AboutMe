import axios from "axios";
import "dotenv/config";
import ApiError from "../utils/APIerror.js";

const getChannelInfo = async function (req, res) {
	const url = `https://www.googleapis.com/youtube/v3/search`;
	const GOOGLE_CONSOLE_API_KEY = process.env.GOOGLE_CONSOLE_API_KEY;
	const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

	try {
		const response = await axios.get(url, {
			params: {
				key: GOOGLE_CONSOLE_API_KEY,
				channelId: YOUTUBE_CHANNEL_ID,
				part: "snippet",
				maxResults: 10,
				order: "date", // Fetch videos by most recent
			},
		});

		return res.status(200).json(response.data.items);
	} catch (error) {
		return ApiError(res, 500, "internal server error!", error);
	}
};

export { getChannelInfo };
