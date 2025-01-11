import { User } from "../models/user.model.js";
import { sendOtp } from "../services/emailOtp.service.js";
import ApiError from "./APIerror.js";

const sendForgotPasswordOtp = async function (req, res) {
	const { username } = req.body;

	if (!username) {
		ApiError(res, 400, "bad request - username required!");
	}

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(200).json({
				// sending a fake response for security reasons
				status: "ok",
				message: "otp is sent to the registered email",
			});
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
		const OTP = generateOTP();
		const validForMinutes = 5;
		const otpExpiryTime = new Date(
			Date.now() + validForMinutes * 60 * 1000
		);

		//saving the updated otp in DB
		user.otp = OTP;
		user.otpExpiryTime = otpExpiryTime;
		await user.save();

		// sending the OTP email to the user
		const userEmail = user.email;
		await sendOtp(userEmail, OTP, validForMinutes, "reset");

		return res.status(200).json({
			status: "ok",
			message: "otp is sent to the registered email",
		});
	} catch (error) {
		return ApiError(res, 500, "internal server error", error);
	}
};

const verifyForgotPasswordOtp = async function (req, res) {
	const { username, otp, password } = req.body;
	if (!username || !otp) {
		return ApiError(res, 400, "bad request - parameter missing");
	}

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return ApiError(res, 400, "bad request - invalid parameters");
		}

		if (user.otp !== otp || user.otpExpiryTime < new Date(Date.now()) ) {
			return ApiError(res, 400, "bad request - invalid otp");
		}

		user.password = password;
		user.otpExpiryTime = new Date(Date.now())
		await user.save()

		return res.status(200).json({
			status:"ok",
			message:"password reset successful"
		})

	} catch (error) {
		return ApiError(res, 500, "internal server error", error);
	}
};

export { sendForgotPasswordOtp, verifyForgotPasswordOtp };
