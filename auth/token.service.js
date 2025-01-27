import jwt from "jsonwebtoken";

const generateRefreshToken = function (payload) {
	if (!payload)
		throw new Error("Payload is required for generating the refresh token");
	const refreshTokenData = {
		username: payload.username,
		role: payload.role,
		email: payload.email,
		phone: payload.phone,
	};
	try {
		return jwt.sign(refreshTokenData, process.env.REFRESH_TOKEN_SECRET, {
			algorithm: "HS256",
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME,
		});
	} catch (error) {
		console.error("Error generating the refresh token: ", error.message);
		throw new Error("Failed to generate refresh token");
	}
};

const verifyRefreshToken = function (token) {
	if (!token) return;
	try {
		return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
	} catch (error) {
		console.error("Error decoding the refresh token!", error.message);
		throw new Error("Failed to verify the refresh token!");
	}
};

const generateAccessToken = function (payload) {
	if (!payload)
		throw new Error("Payload is required for generating the access token");
	const accessTokenData = {
		username: payload.username,
		role: payload.role,
	};
	try {
		return jwt.sign(accessTokenData, process.env.ACCESS_TOKEN_SECRET, {
			algorithm: "HS256",
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
		});
	} catch (error) {
		console.error("Error generating the access token: ", error.message);
		// throw new Error("Failed to generate access token");
	}
};

const verifyAccessToken = function (token) {
	if (!token) return;
	try {
		return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		console.error("Error decoding the access token!", error.message);
	}
};

export {
	generateRefreshToken,
	verifyRefreshToken,
	generateAccessToken,
	verifyAccessToken,
};
