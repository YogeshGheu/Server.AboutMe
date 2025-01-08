const ApiError = (res, statusCode = 500, message = "Internal Server Error", error=null) => {
	const err = {
		statusCode,
		message,
        error
	};

	if (res) {
		return res.status(statusCode).json(err);
	} else {
		console.error(err);
	}
};

export default ApiError;
