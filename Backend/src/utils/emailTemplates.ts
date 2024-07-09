export const getEmailVerificationText = (
    firstName: string,
    verificationLink: string
) => `
Hi ${firstName},

Welcome to [Your Website Name]!

To complete your registration and start enjoying all the features we offer, please verify your email address.

Click the link below to verify your email:
${verificationLink}

If you didn’t create an account with [Your Website Name], please ignore this email.

Best regards,
The [Your Website Name] Team
`;

export const getEmailVerificationHtml = (
    firstName: string,
    verificationLink: string
) => `
<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <p>Hi ${firstName},</p>
    <p>Welcome to <strong>[Your Website Name]</strong>!</p>
    <p>To complete your registration and start enjoying all the features we offer, please verify your email address.</p>
    <p><a href="${verificationLink}" style="display:inline-block;padding:10px 20px;background-color:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">Verify My Email</a></p>
    <p>If you didn’t create an account with <strong>[Your Website Name]</strong>, please ignore this email.</p>
    <p>Best regards,</p>
    <p>The <strong>[Your Website Name]</strong> Team</p>
</body>
</html>
`;

export const getPasswordResetText = (firstName: string, resetLink: string) => `
Hi ${firstName},

We received a request to reset your password for your [Your Website Name] account. If you didn't request a password reset, please ignore this email.

To proceed with resetting your password, click the link below:

Reset your password: ${resetLink}

**Note:** This link is valid for a limited time and will expire shortly.

Best regards,
The [Your Website Name] Team
`;

export const getPasswordResetHtml = (firstName: string, resetLink: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Reset Your Password</title>
</head>
<body>
    <p>Hi ${firstName},</p>
    <p>We received a request to reset your password for your <strong>[Your Website Name]</strong> account. If you didn't request a password reset, please ignore this email.</p>
    <p>To proceed with resetting your password, click the link below:</p>
    <p><a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">Reset Your Password</a></p>
    <p><strong>Note:</strong> This link is valid for a limited time and will expire shortly.</p>
    <p>Best regards,</p>
    <p>The <strong>[Your Website Name]</strong> Team</p>
</body>
</html>
`;
