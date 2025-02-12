import { Resume } from "../models/resume.model.js";
import { uploadImage } from "../services/cloudinary.service.js";
import ApiError from "../utils/APIerror.js";
import { User } from "../models/user.model.js";
import fs from "fs";
import path from "path";

const addPersonalDetails = async function (req, res) {
	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.nickName ||
		!req.body.gender ||
		!req.body.age
	) {
		return ApiError(res, 400, "bad request - required parameters missing");
	}

	const { firstName, lastName, nickName, gender, age } = req.body;

	let photo;

	if (!req.file) {
		photo = null;
	} else {
		// console.log("this is req.file : ", req.file);
		const uploadImg = await uploadImage(req.file.path, req.username);
		photo = uploadImg.secure_url;
	}

	try {
		await fs.promises.unlink(req.file.path);
	} catch (error) {
		console.log("error deleting the temp file from server: ", error);
	}

	const personalDetails = {
		firstName,
		lastName,
		nickName,
		age,
		gender,
		photo,
	};

	try {
		const user = await User.findOne({ username: req.username });
		let resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				personalDetails,
				createdBy: user._id,
			});

			user.resume.push(resume._id);
			await user.save();
		} else {
			resume.personalDetails = {
				firstName,
				lastName,
				nickName,
				age,
				gender,
				photo: photo ? photo : resume.personalDetails.photo,
			};
			await resume.save();
		}

		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(
			res,
			500,
			"internal server error - something went wrong"
		);
	}
};

const getPersonalDetails = async (req, res) => {
	if (!req.username) return ApiError(res, 400, "bad request!");
	const user = await User.findOne({ username: req.username }).populate({
		path: "resume",
	});

	if (!user) return ApiError(res, 400, "bad request!");

	if (user.resume.length == 0) {
		return res.status(200).json({
			status: 404,
			message: "ok",
			data: "no data found!",
		});
	}

	return res.status(200).json({
		status: 200,
		message: "ok",
		data: user.resume[0].personalDetails,
	});
};

const addJobDetails = async (req, res) => {
	if (!req.username || !req.body.jobTitle || !req.body.jobDescription)
		return ApiError(res, 400, "bad request !");

	const { jobTitle, jobDescription } = req.body;

	try {
		const user = await User.findOne({ username: req.username });
		let resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				jobProfile: {
					jobTitle,
					jobDescription,
				},
				createdBy: user._id,
			});

			user.resume.push(resume._id);
			await user.save();
		} else {
			resume.jobProfile = {
				jobTitle,
				jobDescription,
			};
			await resume.save();
		}
		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error");
	}
};

const getJobDetails = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized");
	try {
		const user = await User.findOne({ username: req.username }).populate({
			path: "resume",
		});

		if (!user) return ApiError(res, 400, "bad request! is there ");

		if (user.resume.length == 0) {
			return res.status(200).json({
				status: 404,
				message: "ok",
				data: "no data found!",
			});
		}

		return res.status(200).json({
			status: 200,
			message: "ok",
			data: user.resume[0].jobProfile,
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error");
	}
};

const addContactDetails = async function (req, res) {
	if (!req.username) return ApiError(res, 401, "unauthorized");

	if (
		!req.body.contactDetails.email ||
		!req.body.contactDetails.phone ||
		!req.body.contactDetails.github ||
		!req.body.contactDetails.linkedIn ||
		!req.body.contactDetails.address
	) {
		return ApiError(res, 400, "bad request - parameters missing!");
	}

	try {
		const user = await User.findOne({ username: req.username });
		let resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				contactDetails: req.body.contactDetails,
				createdBy: user._id,
			});

			user.resume.push(resume._id);
			await user.save();
		} else {
			resume.contactDetails = req.body.contactDetails;
			await resume.save();
		}
		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error", error);
	}
};

const getContactDetails = async function (req, res) {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	const user = await User.findOne({ username: req.username }).populate({
		path: "resume",
	});

	if (!user) {
		return res.json({
			status: 404,
			message: "no data found",
		});
	}

	return res.status(200).json({
		status: 200,
		message: "ok",
		data: user.resume[0].contactDetails,
	});
};

const addSkills = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	if (!req.body || req.body?.length <= 0) {
		return ApiError(res, 400, "bad request - missing parameters");
	}

	try {
		const user = await User.findOne({ username: req.username });
		const resume = await Resume.findOne({ _id: { $in: user.resume } });
		if (!resume) {
			const resume = await Resume.create({
				skills: req.body,
				createdBy: user._id,
			});
			user.resume.push(resume._id);
			await user.save();
		} else {
			resume.skills = req.body;
			await resume.save();
		}
		return res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		ApiError(res, 500, "internal server error!", error);
	}
};
const getSkills = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	try {
		const user = await User.findOne({ username: req.username }).populate({
			path: "resume",
		});
		if (!user)
			return res.status(404).json({
				status: 404,
				message: "no data found",
			});

		res.status(200).json({
			status: 200,
			message: "ok",
			skills: user.resume[0].skills,
		});
	} catch (error) {
		console.log(error);
		ApiError(res, 500, "internal server error", error);
	}
};

const addCertificates = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	// wont be able to delete the last certificate - will fix this later
	if (req.body.length <= 0)
		return ApiError(res, 400, "bad request - missing parameters");

	try {
		const user = await User.findOne({ username: req.username });
		const resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				certificates: req.body,
				createdBy: user._id,
			});
			user.resume.push(resume._id);
			await user.save();
		} else {
			resume.certificates = req.body;
			await resume.save();
		}
		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error", error);
	}
};
const getCertificates = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	try {
		const user = await User.findOne({ username: req.username }).populate({
			path: "resume",
		});
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: "no data found!",
			});
		} else {
			return res.status(200).json({
				status: 200,
				message: "ok",
				data: user.resume[0].certificates,
			});
		}
	} catch (error) {
		console.log(error);
		return ApiError(res, 400, "internal server error", error);
	}
};

const addLanguages = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	try {
		const user = await User.findOne({ username: req.username });
		if (!user) return ApiError(res, 400, "bad request - no user found");

		const resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				languages: req.body,
				createdBy: user._id,
			});
			user.resume.push(resume._id);
			await resume.save();
		} else {
			resume.languages = req.body;
			await resume.save();
		}
		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error", error);
	}
};

const getLanguages = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");
	try {
		const user = await User.findOne({ username: req.username }).populate({
			path: "resume",
		});
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: "no data found!",
			});
		} else {
			return res.status(200).json({
				status: 200,
				message: "ok",
				data: user.resume[0].languages,
			});
		}
	} catch (error) {
		console.log(error);
		return ApiError(res, 400, "internal server error", error);
	}
};

const addEducations = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	try {
		const user = await User.findOne({ username: req.username });
		if (!user) return ApiError(res, 400, "bad request - no user found");

		const resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				education: req.body,
				createdBy: user._id,
			});
			user.resume.push(resume._id);
			await resume.save();
		} else {
			resume.education = req.body;
			await resume.save();
		}
		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error", error);
	}
};
const getEducations = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");
	try {
		const user = await User.findOne({ username: req.username }).populate({
			path: "resume",
		});
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: "no data found!",
			});
		} else {
			return res.status(200).json({
				status: 200,
				message: "ok",
				data: user.resume[0].education,
			});
		}
	} catch (error) {
		console.log(error);
		return ApiError(res, 400, "internal server error", error);
	}
};

const addHobby = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");

	try {
		const user = await User.findOne({ username: req.username });
		if (!user) return ApiError(res, 400, "bad request - no user found");

		const resume = await Resume.findOne({ _id: { $in: user.resume } });

		if (!resume) {
			const resume = await Resume.create({
				hobbies: req.body,
				createdBy: user._id,
			});
			user.resume.push(resume._id);
			await resume.save();
		} else {
			resume.hobbies = req.body;
			await resume.save();
		}
		res.status(200).json({
			status: 200,
			message: "ok",
		});
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error", error);
	}
};
const getHobby = async (req, res) => {
	if (!req.username) return ApiError(res, 401, "unauthorized access!");
	try {
		const user = await User.findOne({ username: req.username }).populate({
			path: "resume",
		});
		if (!user) {
			return res.status(404).json({
				status: 404,
				message: "no data found!",
			});
		} else {
			return res.status(200).json({
				status: 200,
				message: "ok",
				data: user.resume[0].hobbies,
			});
		}
	} catch (error) {
		console.log(error);
		return ApiError(res, 400, "internal server error", error);
	}
};

const getAllData = async (req, res) => {
	if (!req.query.username) return ApiError(res, 400, "Bad Request - No username received");
	try {
		const user = await User.findOne({
			username: req.query.username,
		}).populate({
			path: "resume",
		});
		if (!user) {
			return ApiError(res, 404, "no data found");
		} else {
			return res.status(200).json({
				status: 200,
				message: "ok",
				data: user.resume[0],
			});
		}
	} catch (error) {
		console.log(error);
		return ApiError(res, 500, "internal server error");
	}
};

export {
	addPersonalDetails,
	getPersonalDetails,
	addJobDetails,
	getJobDetails,
	addContactDetails,
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
	getAllData,
};
