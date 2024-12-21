import * as yup from 'yup';

export const PersonalInfoValidationSchema = yup.object({
    fullName: yup.string().required('Please enter your full name'),
    userName: yup.string().required('Please enter your username'),
});