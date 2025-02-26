import React from 'react';
import { useFormik } from 'formik';
import makeApiRequest from '../../utils/MakeApiRequest';
import { PasswordResetValidationSchema } from './ResetValidationSchema';
import toast from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import { ErrorType } from '../../type/Error.type';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PasswordResetForm: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token");

    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues: {
                newPassword: "",
                confirmPassword: "",
            },
            validationSchema: PasswordResetValidationSchema,
            onSubmit: async (values) => {
                makeApiRequest({
                    method: "post",
                    url: "/api/v1/auths/password-reset",
                    data: {
                        token: token,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword,
                    },
                }).then(() => {
                    toast.success("Password reset successfully");
                }).catch((error: ErrorType) => {
                    if (error.response.data.statusCode === 401) {
                        toast.error("Invalid or expired reset password link. Please try with a new link.");
                    }
                    else {
                        toast.error(error.response.data.message);
                    }
                    console.error(error.response.data.message);
                });
            },
        });

    return (
        <form onSubmit={handleSubmit}
            className="w-full text-white text-left pt-2">
            <div className="px-2 mb-3 text-sm relative text-primary-text">
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
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-primary outline-none transition delay-[50000s]
				placeholder:text-primary-text2 text-sm text-primary-text"
                />
                <label htmlFor="newPassword" className="cursor-pointer absolute right-4 top-8" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </label>
                {touched.newPassword && errors.newPassword ? <p className="text-start text-xs mt-0.5">{errors.newPassword}</p> : null}
            </div>
            <div className="px-2 mb-4 text-sm relative text-primary-text">
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
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-primary outline-none transition delay-[50000s]
				    placeholder:text-primary-text2 text-sm text-primary-text"
                />
                <label htmlFor="confirmPassword" className="cursor-pointer absolute right-4 top-8" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </label>
                {touched.confirmPassword && errors.confirmPassword ? <p className="text-start text-xs mt-0.5">{errors.confirmPassword}</p> : null}
            </div>

            <div className='flex gap-2 w-full px-2 pt-3 text-sm text-nowrap text-primary-text'>
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="px-2 py-1 mb-1 w-1/2 tracking-wide font-semibold 
                    rounded-md outline-none bg-primary-login xs:text-sm">
                    Login
                </button>

                <button
                    type="submit"
                    className={twMerge(["px-2 py-1 mb-1 w-1/2 tracking-wide font-semibold",
                        "rounded-md bg-primary-login outline-none xs:text-sm",
                        (values.newPassword === "" || values.confirmPassword === "") && "opacity-75"])}>
                    Reset Password
                </button>
            </div>
        </form>
    );
};

export default PasswordResetForm;