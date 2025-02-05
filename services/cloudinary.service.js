import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs/promises";
// const __dirname = import.meta.dirname;
// const __filename = import.meta.filename;
import path from "path";

const uploadImage = async function (imagePath, username) {
	// Configuration
	cloudinary.config({
		cloud_name: "aboutme",
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		await fs.access(imagePath);
		const uploadResult = await cloudinary.uploader.upload(imagePath, {
			public_id: `profileImage_${username}`,
		});
		// fs.rm(path.dirname(imagePath), {
		// 	recursive: true,
		// 	force: true,
		// });
		// await fs.unlink(imagePath);
		return uploadResult;
	} catch (error) {
		console.log("error uploading the image: ", error);
		return null;
	}

	// return uploadResult;
};

export { uploadImage };
