import { Resume } from "../models/resume.model.js";
import { uploadImage } from "../services/cloudinary.service.js";
import ApiError from "../utils/APIerror.js";
import { User } from "../models/user.model.js";
import fs from "fs"

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
			status: 200,
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

const addContactDetails = async function (req, res) {};

export { addPersonalDetails, getPersonalDetails, addContactDetails };
