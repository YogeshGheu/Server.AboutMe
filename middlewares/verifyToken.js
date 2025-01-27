import {
	verifyAccessToken,
	verifyRefreshToken,
	generateAccessToken,
} from "../auth/token.service.js";

const verifyToken = async function (req, res, next) {
	try {
		const isAccessToken = await verifyAccessToken(req.cookies.accessToken);

		if (!isAccessToken) {
			const isRefreshToken = await verifyRefreshToken(
				req.cookies.refreshToken
			);

			if (!isRefreshToken) {
				return res.status(401).json({
					status: 401,
					message: "unauthorized access!",
				});
			}

			const newAccessToken = generateAccessToken({
				username: isRefreshToken.username,
				role: isRefreshToken.role,
			});

			res.cookie("accessToken", newAccessToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});

            req.username = isRefreshToken.username;
            next()
			// return res.status(200).json({
			// 	status: 200,
			// 	message: "access token renewed!",
			// });
		}

        req.username = isAccessToken.username;

        next()
        // return res.status(200).json({
        //     status:200,
        //     message:"access approved"
        // })

	} catch (error) {
		console.log({
			status: 500,
			message: "error occured while decoding token!",
            error
		});
	}
};

export { verifyToken };
