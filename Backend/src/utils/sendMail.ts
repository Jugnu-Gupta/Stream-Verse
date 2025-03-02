import nodemailer from "nodemailer";
import { User } from "../models/user.model";
import { ApiError } from "./apiError";
import bcrypt from "bcrypt";
import {
    getEmailVerificationText,
    getEmailVerificationHtml,
    getPasswordResetText,
    getPasswordResetHtml,
} from "./emailTemplates";
import { BASE_URL } from "../config/constants/db.constants";

const sendMail = async (email: string, emailType: string) => {
    try {
        const user = await User.findOne({ email })?.select("id");
        if (!user) {
            throw new ApiError(400, "Invalid email Id");
        }
        const hashedToken = await bcrypt.hash(user._id.toString(), 10);
        let subject: string, text: string, html: string;

        if (emailType === "RESET") {
            await User.findByIdAndUpdate(user._id, {
                $set: {
                    resetPasswordToken: hashedToken,
                    resetPasswordTokenExpiry: Date.now() + 3600000,
                },
            });

            subject = "Reset your password";
            text = getPasswordResetText(
                "Jugnu Gupta",
                `${BASE_URL}/password-reset?token=${hashedToken}`
            );
            html = getPasswordResetHtml(
                "Jugnu Gupta",
                `${BASE_URL}/password-reset?token=${hashedToken}`
            );
        } else if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(user._id, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                },
            });

            subject = "Verify your email";
            text = getEmailVerificationText(
                "Jugnu Gupta",
                `${BASE_URL}/email-verification?token=${hashedToken}`
            );
            html = getEmailVerificationHtml(
                "Jugnu Gupta",
                `${BASE_URL}/email-verification?token=${hashedToken}`
            );
        } else {
            throw new ApiError(500, "Invalid email type");
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
            html: html,
        };

        const mail = await transporter.sendMail(mailOptions);
        return mail;
    } catch (error) {
        throw new ApiError(500, `Failed to send mail: ${error.message}`);
    }
};

export { sendMail };
