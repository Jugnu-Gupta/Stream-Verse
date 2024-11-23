import * as yup from 'yup';

export const PersonalInfoValidationSchema = yup.object({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    userName: yup.string().required('Please enter your username'),
    description: yup.string().required('Please enter your description'),
});