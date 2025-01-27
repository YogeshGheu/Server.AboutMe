import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: process.env.DEFAULT_PROFILE_PICTURE,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		refreshToken: {
			type: String,
			unique: true,
			required: false,
		},
		otp: {
			type: String,
			required: false,
		},
		otpExpiryTime: {
			type: Date,
			required: false,
		},
		resume: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Resume",
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	const encryptedPassword = await bcrypt.hash(this.password, salt);
	this.password = encryptedPassword;
	next();
});

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password); // returns true or false
};

export const User = mongoose.model("User", userSchema);
