import sgMail from "@sendgrid/mail";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendOtp = async function (to, OTP, type = "set" || "reset") {
    sgMail.setApiKey(process.env.TWILIO_SENDGRID_API_KEY);
	const from = process.env.TWILIO_SENDGRID_SENDER_EMAIL;

	const setPassText = "Use the code below to complete your login:";
	const resetPassText = "Use the code below to reset the password for your AboutMe Account:";
	const templatePath = path.join(__dirname, "emailOtp.template.html");

	let htmlContent = "";
	if (type === "set") {
		htmlContent = fs
			.readFileSync(templatePath)
			.toString()
			.replace("123456", OTP)
			.replace("xxxxxmessagexxxxx", setPassText);
	} else if (type == "reset") {
		htmlContent = fs
			.readFileSync(templatePath)
			.toString()
			.replace("123456", OTP)
			.replace("xxxxxmessagexxxxx", resetPassText);
	}

	const msg = {
		to: to,
		from: from,
		subject: "AboutMe - One Time Password",
		text: "Your OTP is here!",
		html: htmlContent,
	};

	await sgMail.send(msg);
};


export { sendOtp };
