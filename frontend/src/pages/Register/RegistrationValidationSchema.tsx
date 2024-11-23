import * as yup from 'yup';

export const RegistrationValidationSchema = yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup.string().email('Invalid email address').required('Please enter your email'),
    password: yup.string().min(6).required('Please enter your password'),
});