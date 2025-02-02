import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
	{
		projects: {
			projectName: {
				type: String,
				default: "",
			},
			projectDescription: {
				type: String,
				default: "",
			},
			from: {
				type: String,
				default: "",
			},
			to: {
				type: String,
				default: "",
			},
			skillsUsed: {
				type: [String],
				default: [],
			},
			projectImages: {
				type: String,
			},
			projectVideos: {
				type: String,
			},
			createdBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

export const Project = mongoose.model("project", projectSchema);
