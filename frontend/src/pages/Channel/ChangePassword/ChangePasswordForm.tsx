import React from 'react';
import { useFormik } from 'formik';
import { ApiRequestOptions } from '../../../utils/MakeApiRequest';
import makeApiRequest from '../../../utils/MakeApiRequest';
import { ChangePasswordValidationSchema } from './ChangePasswordValidationSchema';


const ChangePasswordForm: React.FC = () => {
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues: {
                curPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            validationSchema: ChangePasswordValidationSchema,
            onSubmit: async (values) => {
                const request: ApiRequestOptions = {
                    method: "post",
                    url: "/api/v1/auths/register",
                    data: {
                        curPassword: values.curPassword,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword,
                    },
                };
                // const res = await makeApiRequest(request);
                console.log(values);
                // console.log(res);
            },
        });
    // console.log(errors);
    return (
        <form onSubmit={handleSubmit}
            className="w-full text-white border-2 border-white rounded-xl py-2">
            <div className="relative px-2 mb-3 text-sm">
                <label htmlFor="curPassword">
                    Current password
                </label>
                <input
                    type="text"
                    name="curPassword"
                    id="curPassword"
                    value={values.curPassword}
                    placeholder="Current password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-0.5 mt-1 w-full rounded-md bg-background-secondary outline-none transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm  focus:ring-2 focus:ring-primary border-[1px] border-white"
                />
            </div>
            <div className="relative px-2 mb-3 text-sm">
                <label htmlFor="newPassword">
                    New password
                </label>
                <input
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    value={values.newPassword}
                    placeholder="New password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-0.5 mt-1 w-full rounded-md bg-background-secondary outline-none transition delay-[50000s]
				placeholder:text-gray-300 placeholder:text-sm focus:ring-2 focus:ring-primary border-[1px] border-white"
                />
                <p className='text-xs mt-0.5'>Your new password must be of more than 6 characters.</p>
            </div>
            <div className="relative px-2 mb-4 text-sm">
                <label htmlFor="confirmPassword">
                    Confirm password
                </label>
                <input
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-0.5 mt-1 w-full rounded-md bg-background-secondary outline-none transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm focus:ring-2 focus:ring-primary border-[1px] border-white"
                />
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
                    Update Password
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;