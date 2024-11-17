import React from 'react';
import { useFormik } from 'formik';
import { ApiRequestOptions } from '../../../utils/MakeApiRequest';
// import makeApiRequest from '../../../utils/MakeApiRequest';

const PersonalInfoForm: React.FC = () => {
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues: {
                firstName: "",
                lastName: "",
                userName: "",
            },
            validationSchema: PersonalInfoValidationSchema,
            onSubmit: async (values) => {
                const request: ApiRequestOptions = {
                    method: "post",
                    url: "/api/v1/auths/register",
                    data: {
                        fullName: `${values.firstName}${values.lastName !== "" ? " " + values.lastName : ""}`,
                        userName: values.userName,
                    },
                };
                // const res = await makeApiRequest(request);
                console.log(values);
                // console.log(res);
            },
        });

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 items-center text-white">
            <div className="relative">
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
                    className="pl-2 pr-10 py-1 w-72 rounded-md bg-background-primary outline-none transition delay-[50000s]
                    placeholder:text-white placeholder:text-sm focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label htmlFor="lastName">
                    Last name
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    placeholder="Last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 w-72 rounded-md bg-background-primary outline-none transition duration-[50000s]
                        placeholder:text-white placeholder:text-sm focus:ring-2 focus:ring-primary"
                />
            </div>
            <div>
                <label htmlFor="userName">
                    User name
                </label>
                <input
                    type="text"
                    name="userName"
                    value={values.userName}
                    placeholder="User Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 w-72 rounded-md bg-background-primary 
                outline-none transition delay-[50000s] placeholder:text-white 
                placeholder:text-sm focus:ring-2 focus:ring-primary"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 mb-1 tracking-wide font-medium 
                        text-xs text-white rounded-md bg-primary">
                Sign Up
            </button>
        </form>
    );
};


export default PersonalInfoForm;