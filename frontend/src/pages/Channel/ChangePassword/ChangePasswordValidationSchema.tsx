import * as yup from 'yup';

export const ChangePasswordValidationSchema = yup.object({
    curPassword: yup.string().required('Please enter your current password'),
    newPassword: yup.string().min(6, 'New password must of be at least 6 characters').required('Please enter your new password'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match')
});