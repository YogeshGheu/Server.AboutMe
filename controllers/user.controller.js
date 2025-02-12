import { User } from "../models/user.model.js";
import ApiError from "../utils/APIerror.js";
import { uploadImage } from "../services/cloudinary.service.js";

import {
	generateRefreshToken,
	generateAccessToken,
} from "../auth/token.service.js";

import { TempOTP } from "../models/tempOtp.model.js";

import { sendOtp } from "../services/emailOtp.service.js";

const collectUserDataAndSendOtp = async function (req, res) {
	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.username ||
		!req.body.password ||
		!req.body.email ||
		!req.body.phone ||
		!req.file.path
	) {
		return ApiError(res, 400, "bad request - missing required fields");
	}

	const { firstName, lastName, username, password, email, phone } = req.body;
	const profilePicture = req.file.path;

	// check if the user already exists
	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return ApiError(
				res,
				409,
				"user already exists, please try logging in."
			);
		}
	} catch (error) {
		return ApiError(res, 500, "internal server error!", error);
	}

	const generateOTP = () => {
		const OTPString =
			"qwertyuopasdfghkzxcvbnm1234567890QWERTYUOPASDFGHKZXCVBNM1234567890";
		let OTP = "";
		for (let i = 1; i <= 6; i++) {
			OTP += OTPString[Math.floor(Math.random() * OTPString.length)];
		}
		return OTP;
	};
	const validForMinutes = 3;
	const OTP = generateOTP();
	const otpExpiryTime = new Date(Date.now() + validForMinutes * 60 * 1000);

	await sendOtp(email, OTP, validForMinutes, "set"); // send OTP email for verification

	try {
		await TempOTP.create({
			otp: OTP,
			expiryTime: otpExpiryTime,
			userData: {
				firstName,
				lastName,
				username,
				password,
				email,
				phone,
				profilePicture,
			},
		});
		return res.status(200).json({
			status: 200,
			message: "please verify the otp",
		});
	} catch (error) {
		return ApiError(
			res,
			500,
			"internal server error - please try after 10 minutes",
			error
		);
	}
};

const verifyOtpAndCreateUser = async function (req, res) {
	const { otp } = req.body;
	if (!otp) {
		return ApiError(res, 400, "bad request - OTP missing");
	}

	let tempOTPData;

	try {
		tempOTPData = await TempOTP.findOne({
			otp,
		});

		if (!tempOTPData) {
			return ApiError(res, 401, "unauthorized - invalid otp!");
		}
		if (Date.now() > tempOTPData.expiryTime) {
			return ApiError(res, 401, "unauthorized - otp expired!");
		}
	} catch (error) {
		return ApiError(res, 500, "internal server error!", error);
	}

	const {
		firstName,
		lastName,
		username,
		password,
		email,
		phone,
		profilePicture,
	} = tempOTPData.userData;

	const imageUploadResult = await uploadImage(profilePicture);
	// .secure_url
	if (!imageUploadResult)
		return ApiError(
			res,
			500,
			"internal server error - failed to upload image"
		);

	try {
		const user = await User.create({
			firstName,
			lastName,
			username,
			password,
			email,
			phone,
			profilePicture: imageUploadResult.secure_url,
			isActive: true,
			isVerified: true,
		});

		if (user) {
			await TempOTP.deleteOne({ otp });
			return res.status(201).json({
				status: 201,
				message: "user is created successfully",
				data: {
					id: user._id,
					username: user.username,
					email: user.email,
					role: user.role,
				},
			});
		} else ApiError(res, 500, "internal server error!");
	} catch (error) {
		return ApiError(res, 400, "bad request!", error);
	}
};

const loginUser = async function (req, res) {
	if (!req.body.username || !req.body.password)
		return ApiError(res, 400, "bad request - missing required fields");

	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user || !(await user.matchPassword(password))) {
			return ApiError(res, 400, "bad request! - invalid credentials!");
		}

		const refreshTokenPayload = {
			username: user.username,
			email: user.email,
			phone: user.phone,
			role: user.role,
		};
		const accessTokenPayload = {
			username: user.username,
			role: user.role,
		};

		const refreshToken = generateRefreshToken(refreshTokenPayload);
		const accessToken = generateAccessToken(accessTokenPayload);

		// update the refresh token in DB
		user.refreshToken = refreshToken;
		await user.save();


		const responseData = await User.findOne({username:user.username}).select("-password -__v -refreshToken -createdAt -updatedAt -resume")

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
		});
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		return res.status(200).json({
			status: 200,
			message: "user is logged in",
			data: responseData,
		});
	} catch (error) {
		console.error("Unexpected error occurred: ", error.message);
		return ApiError(res, 500, "Internal Server Error", error);
	}
};

const logoutUser = async function (req, res) {
	const date = new Date(); // current date/time

	res.cookie("refreshToken", "_", {
		httpOnly: true,
		expires: date,
	});
	res.cookie("accessToken", "_", {
		httpOnly: true,
		expires: date,
	});

	res.status(200).json({
		status: "ok",
		message: "used logged out!",
	});
};

const getUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.username }).select(
			"-password -refreshToken -otp -otpExpiryTime -_id  "
		);

		if (!user) {
			return res.status(401).json({
				status: 400,
				message: "bad request!",
			});
		}

		return res.status(200).json({
			status: 200,
			message: "user found!",
			data: user,
		});
	} catch (error) {
		return ApiError(res, 400, "Bad Request", error);
	}
};

export {
	collectUserDataAndSendOtp,
	verifyOtpAndCreateUser,
	loginUser,
	logoutUser,
	getUser,
};
