import { websiteName } from "../config/constants/db.constants";

export const getEmailVerificationText = (
    receiverName: string,
    verificationLink: string
) => `
Hi ${receiverName},

Welcome to ${websiteName}!

To complete your registration and start enjoying all the features we offer, please verify your email address.

Click the link below to verify your email:
${verificationLink}

If you didn't create an account with ${websiteName}, please ignore this email.

Best regards,
The ${websiteName} Team
`;

export const getEmailVerificationHtml = (
    receiverName: string,
    verificationLink: string
) => `
<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <p>Hi ${receiverName},</p>
    <p>Welcome to <strong>${websiteName}</strong>!</p>
    <p>To complete your registration and start enjoying all the features we offer, please verify your email address.</p>
    <p><a href="${verificationLink}" style="display:inline-block;padding:10px 20px;background-color:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">Verify My Email</a></p>
    <p>If you didn't create an account with <strong>${websiteName}</strong>, please ignore this email.</p>
    <p>Best regards,</p>
    <p>The <strong>${websiteName}</strong> Team</p>
</body>
</html>
`;

export const getPasswordResetText = (
    receiverName: string,
    resetLink: string
) => `
Hi ${receiverName},

We received a request to reset your password for your ${websiteName} account. If you didn't request a password reset, please ignore this email.

To proceed with resetting your password, click the link below:

Reset your password: ${resetLink}

**Note:** This link is valid for a limited time and will expire shortly.

Best regards,
The ${websiteName} Team
`;

export const getPasswordResetHtml = (
    receiverName: string,
    resetLink: string
) => `
<!DOCTYPE html>
<html>
<head>
    <title>Reset Your Password</title>
</head>
<body>
    <p>Hi ${receiverName},</p>
    <p>We received a request to reset your password for your <strong>${websiteName}</strong> account. If you didn't request a password reset, please ignore this email.</p>
    <p>To proceed with resetting your password, click the link below:</p>
    <p><a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">Reset Your Password</a></p>
    <p><strong>Note:</strong> This link is valid for a limited time and will expire shortly.</p>
    <p>Best regards,</p>
    <p>The <strong>${websiteName}</strong> Team</p>
</body>
</html>
`;
