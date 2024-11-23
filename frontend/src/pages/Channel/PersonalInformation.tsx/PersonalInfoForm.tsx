import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { ApiRequestOptions } from '../../../utils/MakeApiRequest';
import makeApiRequest from '../../../utils/MakeApiRequest';
import { PersonalInfoValidationSchema } from './PersonalInfoValidationSchema';

const PersonalInfoForm: React.FC = () => {
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues: {
                firstName: "",
                lastName: "",
                userName: "",
                description: "",
            },
            validationSchema: PersonalInfoValidationSchema,
            onSubmit: async (values) => {
                try {
                    const request: ApiRequestOptions = {
                        method: "post",
                        url: "/api/v1/auths/register",
                        data: {
                            fullName: `${values.firstName}${values.lastName !== "" ? " " + values.lastName : ""}`,
                            userName: values.userName,
                            description: values.description
                        },
                    };
                    const { data }: any = await makeApiRequest(request);
                    console.log(values);
                    console.log(data);

                    toast.success("Changes updated successfully");
                    localStorage.setItem("userName", data.user.userName);
                    localStorage.setItem("fullName", data.user.fullName);
                    localStorage.setItem("email", data.user.email);
                    localStorage.setItem("avatar", data.user.avatar.url);
                    localStorage.setItem("cover", data.user.coverImage.url);
                    localStorage.setItem("description", data.user.description);
                } catch (error: any) {
                    console.error(error.response.data.message);
                    toast.error(error.response.data.message);
                }
            },
        });

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full text-white border-2 border-white rounded-xl py-2">
            <div className="px-2 mb-3 text-sm">
                <label htmlFor="firstName">
                    First name
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={values.firstName}
                    placeholder="First name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 text-sm border-[1px] border-white outline-none"
                />
                {touched.firstName && errors.firstName ? <p className="text-start text-xs mt-0.5">{errors.firstName}</p> : null}
            </div>
            <div className='px-2 mb-3 text-sm'>
                <label htmlFor="lastName">
                    Last name
                </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={values.lastName}
                    placeholder="Last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm border-[1px] border-white outline-none"
                />
                {touched.lastName && errors.lastName ? <p className="text-start text-xs mt-0.5">{errors.lastName}</p> : null}
            </div>
            <div className='px-2 mb-3 text-sm'>
                <label htmlFor="userName">
                    User name
                </label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={values.userName}
                    placeholder="User Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm border-[1px] border-white outline-none"
                />
                {touched.userName && errors.userName ? <p className="text-start text-xs mt-0.5">{errors.userName}</p> : null}

            </div>
            <div className='px-2 mb-3 text-sm'>
                <label htmlFor="description">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={values.description}
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    className='px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm border-[1px] border-white outline-none'>
                </textarea>
                {touched.description && errors.description ? <p className="text-start text-xs mt-0.5">{errors.description}</p> : null}
            </div>
            <div className='w-full h-[1px] text-white bg-white' />

            <div className='flex justify-end px-2 pt-3 text-sm text-nowrap'>
                <button
                    type="submit"
                    className="px-3 py-1.5 mb-1 mr-4 tracking-wide font-medium 
                    text-white rounded-md outline-none border-[1px] border-white">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-3 py-1.5 mb-1 tracking-wide font-semibold 
                    text-white rounded-md bg-primary outline-none">
                    Save changes
                </button>
            </div>
        </form>
    );
};


export default PersonalInfoForm;