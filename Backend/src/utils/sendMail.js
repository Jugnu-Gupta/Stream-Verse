import nodemailer from 'nodemailer';
import { User } from '../models/user.model.js';
import { ApiError } from './apiError.js';
import bcrypt from 'bcrypt';

const sendMail = async (email, emailType, userId) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        let subject, text;

        if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                }
            })

            subject = "Reset your password";
            text = `Click on the link to reset your password: 
            ${process.env.BASE_URL}/reset/${hashedToken}`;
        }
        else if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            })

            subject = "Verify your email";
            text = `Click on the link to verify your email: 
            ${process.env.BASE_URL}/verify/${hashedToken}`;
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        };

        const mail = await transporter.sendMail(mailOptions);
        return mail;
    } catch (error) {
        throw new ApiError(500, `Failed to send mail: ${error.message}`);
    }
};

export { sendMail };