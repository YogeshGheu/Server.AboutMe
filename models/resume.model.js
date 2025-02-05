import mongoose from "mongoose";

const resumeSchema = mongoose.Schema(
	{
		personalDetails: {
			type: Object,
			default: {
				firstName: "",
				lastName: "",
				nickName: "",
				age: "",
				gender: "",
				photo: "",
			},
		},
		contactDetails: {
			type: Object,
			default: {
				email: "",
				phone: "",
				github: "",
				linkedIn: "",
				address: "",
			},
		},
		jobProfile: {
			type: Object,
			default: {
				jobTitle: "",
				jobDescription: "",
			},
		},
		skills: {
			type: [String],
			default: [],
		},
		education: {
			type: [
				{
					educationId: { type: String, default: "" },
					educationName: { type: String, default: "" },
					college: { type: String, default: "" },
					place: { type: String, default: "" },
					score: { type: String, default: "" },
					from: { type: String, default: "" },
					to: { type: String, default: "" },
				},
			],
			default: [],
		},
		certificates: {
			type: [
				{
					certificateId: { type: String, default: "" },
					certificateName: { type: String, default: "" },
					platform: { type: String, default: "" },
					from: { type: String, default: "" },
					to: { type: String, default: "" },
				},
			],
			default: [],
		},
		languages: {
			type: [
				{
					languageId: { type: String, default: "" },
					language: { type: String, default: "" },
					proficiency: { type: String, default: "" },
				},
			],
			default: [],
		},

		hobbies: {
			type: [String],
			default: [],
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Resume = mongoose.model("Resume", resumeSchema);
