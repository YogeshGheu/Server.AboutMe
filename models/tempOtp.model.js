import mongoose from "mongoose";

const TempOTPSchema = new mongoose.Schema({
	otp: {
		type: String,
		required: true,
		unique: true,
	},
	expiryTime: {
		type: Date,
		required: true,
		default: () => new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
	},
	userData: {
		type: Object,
		required: true,
		unique: true,
	},
});

// Add TTL index to automatically delete expired documents
TempOTPSchema.index({ expiryTime: 1 }, { expireAfterSeconds: 0 });

export const TempOTP = mongoose.model("TempOTP", TempOTPSchema);
