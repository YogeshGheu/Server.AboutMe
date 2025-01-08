import mongoose from "mongoose";
import ApiError from "../utils/APIerror.js";

export const connectDB = async (DB_URL) => {
	try {
		const connection = await mongoose.connect(DB_URL);
		console.log("DB connection is succcessful!");
		return connection;
	} catch (error) {
		ApiError(null, 500, "Failed to connect to DB", error);
	}
};

