import * as yup from 'yup';

export const ChangePasswordValidationSchema = yup.object({
    curpassword: yup.string().min(6).required('Please enter your current password'),
    newpassword: yup.string().min(6).required('Please enter your new password'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match')
});