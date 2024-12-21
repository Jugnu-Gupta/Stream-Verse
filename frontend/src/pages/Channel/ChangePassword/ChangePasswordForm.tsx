import React from 'react';
import { useFormik } from 'formik';
import makeApiRequest from '../../../utils/MakeApiRequest';
import { ChangePasswordValidationSchema } from './ChangePasswordValidationSchema';
import toast from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface ChangePasswordFormProps {
    email: string | undefined;
}
const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ email }) => {
    const [showCurPassword, setShowCurPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues: {
                curPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            validationSchema: ChangePasswordValidationSchema,
            onSubmit: async (values) => {
                console.log("Form data:", values);
                makeApiRequest({
                    method: "patch",
                    url: "/api/v1/users/password",
                    data: {
                        email: email,
                        curPassword: values.curPassword,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword,
                    },
                }).then(() => {
                    toast.success("Password updated successfully");
                }).catch((error) => {
                    console.error(error.response.data.message);
                    toast.error(error.response.data.message);
                });
            },
        });

    return (
        <form onSubmit={handleSubmit}
            className="w-full text-white border-2 border-white rounded-xl py-2">
            <div className="px-2 mb-3 text-sm relative">
                <label htmlFor="curPassword">
                    Current password
                </label>
                <input
                    type={showCurPassword ? "text" : "password"}
                    name="curPassword"
                    id="curPassword"
                    value={values.curPassword}
                    placeholder="Current password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary outline-none transition delay-[50000s]
				    placeholder:text-gray-300 text-sm border-[1px] border-white"
                />
                <label htmlFor="curPassword" className="cursor-pointer absolute right-4 top-8" onClick={() => setShowCurPassword(!showCurPassword)}>
                    {showCurPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </label>
                {touched.curPassword && errors.curPassword ? <p className="text-start text-xs mt-0.5">{errors.curPassword}</p> : null}
            </div>
            <div className="px-2 mb-3 text-sm relative">
                <label htmlFor="newPassword">
                    New password
                </label>
                <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    value={values.newPassword}
                    placeholder="New password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary outline-none transition delay-[50000s]
				placeholder:text-gray-300 text-sm border-[1px] border-white"
                />
                <label htmlFor="newPassword" className="cursor-pointer absolute right-4 top-8" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </label>
                {touched.newPassword && errors.newPassword ? <p className="text-start text-xs mt-0.5">{errors.newPassword}</p> : null}
            </div>
            <div className="px-2 mb-4 text-sm relative">
                <label htmlFor="confirmPassword">
                    Confirm password
                </label>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary outline-none transition delay-[50000s]
				    placeholder:text-gray-300 text-sm border-[1px] border-white"
                />
                <label htmlFor="confirmPassword" className="cursor-pointer absolute right-4 top-8" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </label>
                {touched.confirmPassword && errors.confirmPassword ? <p className="text-start text-xs mt-0.5">{errors.confirmPassword}</p> : null}
            </div>
            <div className='w-full h-[1px] text-white bg-white' />

            <div className='flex justify-end px-2 pt-3 text-sm text-nowrap'>
                <button
                    type="button"
                    className="px-3 py-1 mb-1 mr-4 tracking-wide font-medium 
                    text-white rounded-md outline-none border-[1px] border-white">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-3 py-1 mb-1 tracking-wide font-semibold 
                    text-white rounded-md bg-primary outline-none">
                    Update Password
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;