import axios from "axios";
import "dotenv/config";
import ApiError from "../utils/APIerror.js";

const getChannelInfo = async function (req, res) {
	const url = `https://www.googleapis.com/youtube/v3/channels`;
	const GOOGLE_CONSOLE_API_KEY = process.env.GOOGLE_CONSOLE_API_KEY;
	const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

	try {
		const response = await axios.get(url, {
			params: {
				key: GOOGLE_CONSOLE_API_KEY,
				id: YOUTUBE_CHANNEL_ID,
				part: "snippet",
			},
		});
		// const response = await axios.get(url, {
		// 	params: {
		// 		key: GOOGLE_CONSOLE_API_KEY,
		// 		channelId: YOUTUBE_CHANNEL_ID,
		// 		part: "snippet",
		// 		maxResults: 10,
		// 		order: "date", // Fetch videos by most recent
		// 	},
		// });
		// const tempResponse = [{
		// 	"kind": "youtube#searchResult",
		// 	"etag": "9lDlpQJ6A2vjUOMUWnJF33DdNDs",
		// 	"id": {
		// 		"kind": "youtube#video",
		// 		"videoId": "Imh8HV_Yrw4"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2025-01-25T06:48:41Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "R15M/V4 | Chain Maintenance DIY | Clean, Lube &amp; Adjust Like a Pro 🛠️",
		// 		"description": "In this video, learn how to perform complete chain maintenance on your Yamaha R15M/V4. This step-by-step guide covers ...",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://i.ytimg.com/vi/Imh8HV_Yrw4/default.jpg",
		// 				"width": 120,
		// 				"height": 90
		// 			},
		// 			"medium": {
		// 				"url": "https://i.ytimg.com/vi/Imh8HV_Yrw4/mqdefault.jpg",
		// 				"width": 320,
		// 				"height": 180
		// 			},
		// 			"high": {
		// 				"url": "https://i.ytimg.com/vi/Imh8HV_Yrw4/hqdefault.jpg",
		// 				"width": 480,
		// 				"height": 360
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2025-01-25T06:48:41Z"
		// 	}
		// }, {
		// 	"kind": "youtube#searchResult",
		// 	"etag": "saK8_UbYwfdxPx84uT2eHkCTzPE",
		// 	"id": {
		// 		"kind": "youtube#video",
		// 		"videoId": "Jo9DADQnJTs"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2024-12-24T03:00:22Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "Yamaha R15M/V4 Brake Pad Replacement Tutorial | Front &amp; Rear Brake Maintenance Guide",
		// 		"description": "In this video, I'll show you how to replace the front and rear brake pads on a Yamaha R15M/V4. Ever wondered how to handle ...",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://i.ytimg.com/vi/Jo9DADQnJTs/default.jpg",
		// 				"width": 120,
		// 				"height": 90
		// 			},
		// 			"medium": {
		// 				"url": "https://i.ytimg.com/vi/Jo9DADQnJTs/mqdefault.jpg",
		// 				"width": 320,
		// 				"height": 180
		// 			},
		// 			"high": {
		// 				"url": "https://i.ytimg.com/vi/Jo9DADQnJTs/hqdefault.jpg",
		// 				"width": 480,
		// 				"height": 360
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2024-12-24T03:00:22Z"
		// 	}
		// }, {
		// 	"kind": "youtube#searchResult",
		// 	"etag": "j3ldoSIKDadeExFpQHmR0W6dURM",
		// 	"id": {
		// 		"kind": "youtube#video",
		// 		"videoId": "yUS32Y55Yj0"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2024-12-07T05:30:19Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "R15M V4 DRL Modification | Transform Your Yamaha R15 with Dynamic LED DRLs",
		// 		"description": "In this video, I show how I installed two LED strips with a sleek running/filling effect to serve as DRLs (Daytime Running Lights), ...",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://i.ytimg.com/vi/yUS32Y55Yj0/default.jpg",
		// 				"width": 120,
		// 				"height": 90
		// 			},
		// 			"medium": {
		// 				"url": "https://i.ytimg.com/vi/yUS32Y55Yj0/mqdefault.jpg",
		// 				"width": 320,
		// 				"height": 180
		// 			},
		// 			"high": {
		// 				"url": "https://i.ytimg.com/vi/yUS32Y55Yj0/hqdefault.jpg",
		// 				"width": 480,
		// 				"height": 360
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2024-12-07T05:30:19Z"
		// 	}
		// }, {
		// 	"kind": "youtube#searchResult",
		// 	"etag": "U5WUickyOCxLa-dFrpJFHFp5XU4",
		// 	"id": {
		// 		"kind": "youtube#video",
		// 		"videoId": "GByATW7eqh0"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2024-11-30T13:30:06Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "Fix R15M Bluetooth Battery Drain Issue!",
		// 		"description": "Are you facing a battery drain issue on your Yamaha R15M due to the OBD Bluetooth module staying powered on all the time?",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://i.ytimg.com/vi/GByATW7eqh0/default.jpg",
		// 				"width": 120,
		// 				"height": 90
		// 			},
		// 			"medium": {
		// 				"url": "https://i.ytimg.com/vi/GByATW7eqh0/mqdefault.jpg",
		// 				"width": 320,
		// 				"height": 180
		// 			},
		// 			"high": {
		// 				"url": "https://i.ytimg.com/vi/GByATW7eqh0/hqdefault.jpg",
		// 				"width": 480,
		// 				"height": 360
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2024-11-30T13:30:06Z"
		// 	}
		// }, {
		// 	"kind": "youtube#searchResult",
		// 	"etag": "ebc3uNBnIlxstcTq7r1MZlDy8ws",
		// 	"id": {
		// 		"kind": "youtube#video",
		// 		"videoId": "HrLyX3tShTA"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2024-11-23T11:40:44Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "Yamaha R15M 6th Major Home Service | DIY Engine Oil, Throttle Body, Chain Care &amp; More!",
		// 		"description": "\"Yamaha R15M Major Service DIY | Engine Flush, Air Filter, Chain Maintenance & More\" In this video, I take you through the ...",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://i.ytimg.com/vi/HrLyX3tShTA/default.jpg",
		// 				"width": 120,
		// 				"height": 90
		// 			},
		// 			"medium": {
		// 				"url": "https://i.ytimg.com/vi/HrLyX3tShTA/mqdefault.jpg",
		// 				"width": 320,
		// 				"height": 180
		// 			},
		// 			"high": {
		// 				"url": "https://i.ytimg.com/vi/HrLyX3tShTA/hqdefault.jpg",
		// 				"width": 480,
		// 				"height": 360
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2024-11-23T11:40:44Z"
		// 	}
		// }, {
		// 	"kind": "youtube#searchResult",
		// 	"etag": "CZgrtckGoKQ4CmlOWT7LoucUwgs",
		// 	"id": {
		// 		"kind": "youtube#video",
		// 		"videoId": "pZ0fuU7H010"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2024-11-16T06:30:15Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "Biking Passion &amp; Pro Maintenance: An Introduction to My World!",
		// 		"description": "\"Welcome to My World of Bikes and Maintenance! \" Hi, I'm Yogesh—a tech enthusiast with a deep love for bikes! I'm not a ...",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://i.ytimg.com/vi/pZ0fuU7H010/default.jpg",
		// 				"width": 120,
		// 				"height": 90
		// 			},
		// 			"medium": {
		// 				"url": "https://i.ytimg.com/vi/pZ0fuU7H010/mqdefault.jpg",
		// 				"width": 320,
		// 				"height": 180
		// 			},
		// 			"high": {
		// 				"url": "https://i.ytimg.com/vi/pZ0fuU7H010/hqdefault.jpg",
		// 				"width": 480,
		// 				"height": 360
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2024-11-16T06:30:15Z"
		// 	}
		// }, {
		// 	"kind": "youtube#searchResult",
		// 	"etag": "04O-dioA7ksKSJ47OihHnkCtdgA",
		// 	"id": {
		// 		"kind": "youtube#channel",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q"
		// 	},
		// 	"snippet": {
		// 		"publishedAt": "2024-11-09T06:03:55Z",
		// 		"channelId": "UCC2cCuVhAXH1LQPcojxgR3Q",
		// 		"title": "Yogesh Gheu",
		// 		"description": "Welcome to the channel, my name is Yogesh, and I enjoy video making and riding bikes. I share consistently inconsistent videos ...",
		// 		"thumbnails": {
		// 			"default": {
		// 				"url": "https://yt3.ggpht.com/z7-QJ797YyBVA7XQJNGIErL3dPLWujplDFDWRWsJm4J1MruOXXVuGHSMebV8qnGrSz7bN14Mqw=s88-c-k-c0xffffffff-no-rj-mo"
		// 			},
		// 			"medium": {
		// 				"url": "https://yt3.ggpht.com/z7-QJ797YyBVA7XQJNGIErL3dPLWujplDFDWRWsJm4J1MruOXXVuGHSMebV8qnGrSz7bN14Mqw=s240-c-k-c0xffffffff-no-rj-mo"
		// 			},
		// 			"high": {
		// 				"url": "https://yt3.ggpht.com/z7-QJ797YyBVA7XQJNGIErL3dPLWujplDFDWRWsJm4J1MruOXXVuGHSMebV8qnGrSz7bN14Mqw=s800-c-k-c0xffffffff-no-rj-mo"
		// 			}
		// 		},
		// 		"channelTitle": "Yogesh Gheu",
		// 		"liveBroadcastContent": "none",
		// 		"publishTime": "2024-11-09T06:03:55Z"
		// 	}
		// }]

		return res.status(200).json(response.data.items);
		// return res.status(200).json(tempResponse);
	} catch (error) {
		return ApiError(res, 500, "internal server error!", error);
	}
};

const getVideos = async (req, res) => {
	const channelsUrl = `https://www.googleapis.com/youtube/v3/channels`;
	const GOOGLE_CONSOLE_API_KEY = process.env.GOOGLE_CONSOLE_API_KEY;
	const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

	try {
		const channelResponse = await axios.get(channelsUrl, {
			params: {
				key: GOOGLE_CONSOLE_API_KEY,
				id: YOUTUBE_CHANNEL_ID,
				part: "contentDetails",
				
			},
		});

		const uploadsPlaylist = channelResponse?.data.items[0].contentDetails.relatedPlaylists.uploads;
		
		const playlistsUrl = "https://www.googleapis.com/youtube/v3/playlistItems";

		const playlistResponse = await axios.get(playlistsUrl, {
			params: {
				key: GOOGLE_CONSOLE_API_KEY,
				playlistId: uploadsPlaylist,
				part: "snippet",
				maxResults: req.body.videoCount,
			},
		});

		return res.status(200).json(playlistResponse.data.items);
	} catch (error) {
		console.log(error)
		return ApiError(res, 500, "internal server error!", error);
	}
};

export { getChannelInfo, getVideos };
