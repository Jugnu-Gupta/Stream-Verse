import * as yup from 'yup';

export const PasswordResetValidationSchema = yup.object({
    newPassword: yup.string().min(6, 'New password must of be at least 6 characters').required('Please enter your new password'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
});