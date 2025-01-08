import { User } from "../models/user.model.js";
import ApiError from "../utils/APIerror.js";
import { generateRefreshToken } from "../auth/token.service.js";

const createUser = async function (req, res) {
	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.username ||
		!req.body.password ||
		!req.body.email ||
		!req.body.phone
	) {
		return ApiError(res, 400, "bad request - missing required fields");
	}

	const { firstName, lastName, username, password, email, phone } = req.body;

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

	const refreshToken = generateRefreshToken({ username, email, phone });

	try {
		const user = await User.create({
			firstName,
			lastName,
			username,
			password,
			email,
			phone,
			refreshToken,
		});

		if (user) {
			return res.status(201).json({
				code: 201,
				status: "ok",
				message: "user is created successfully",
				data: {
					id: user._id,
					username: user.username,
					email: user.email,
				},
			});
		} else ApiError(res, 500, "internal server error!");
	} catch (error) {
		return ApiError(res, 400, "bad request!", error);
	}
};

export { createUser };
