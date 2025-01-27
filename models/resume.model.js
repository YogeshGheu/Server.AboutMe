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
				photo: "",
			},
		},
		contactDetails: {
			type: Object,
			default: {
				email: "",
				phone: "",
				address: "",
				github: "",
				linkedIn: "",
			},
		},
		jobProfile: {
			type: Object,
			default: {
				jobTitle: "",
				description: "",
			},
		},
		skills: {
			type: [String],
			default: [],
		},
		education: {
			type: [
				{
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
					language: { type: String, default: "" },
					proficiency: { type: String, default: "" },
				},
			],
			default: [],
		},
		projects: {
			type: [
				{
					projectName: { type: String, default: "" },
					projectDescription: { type: String, default: "" },
					from: { type: String, default: "" },
					to: { type: String, default: "" },
					skillsUsed: { type: [String], default: [] },
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
