import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs/promises";
// const __dirname = import.meta.dirname;
// const __filename = import.meta.filename;
import path from "path";

const uploadImage = async function (imagePath) {
	// Configuration
	cloudinary.config({
		cloud_name: "aboutme",
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	// Upload the image and delete from server
	const uploadResult = await cloudinary.uploader
		.upload(imagePath, {
			public_id: "profileImage",
		})
		.catch((error) => {
			console.log(error);
		});

	// delete the file frm server
	try {
		// await fs.unlink(imagePath);
		await fs.rm(path.dirname(imagePath), { recursive: true, force: true });
	} catch (error) {
		console.log(error);
	}

	return uploadResult;
};

export { uploadImage };
