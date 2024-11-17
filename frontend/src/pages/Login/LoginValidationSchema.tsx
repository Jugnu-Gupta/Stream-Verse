import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
    password: Yup.string().required('Please enter your password')
});