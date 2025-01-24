import React from "react";
import { useFormik } from "formik";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import makeApiRequest from "../../utils/MakeApiRequest";
import { RegistrationValidationSchema } from "./RegistrationValidationSchema";
import toast from "react-hot-toast";
import { ErrorType } from "../../type/Error.type";

const RegistrationForm: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [showVerifyEmail, setShowVerifyEmail] = React.useState(false);
	const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
		useFormik({
			initialValues: {
				name: "",
				email: "",
				password: "",
			},
			validationSchema: RegistrationValidationSchema,
			onSubmit: async (values) => {
				makeApiRequest({
					method: "post",
					url: "/api/v1/auths/register",
					data: {
						fullName: values.name.trim(),
						email: values.email.trim(),
						password: values.password,
					},
				}).then(() => {
					setShowVerifyEmail(true);
				}).catch((error: ErrorType) => {
					console.error("Error Registering", error.response.data.message);
					setShowVerifyEmail(false);
					toast.error(error.response.data.message);
				});
			},
		});

	return (
		<form onSubmit={handleSubmit}
			className="flex flex-col gap-3 items-center text-white">
			<div className="relative">
				<input
					type="text"
					name="name"
					id="name"
					value={values.name}
					placeholder="Name"
					onChange={handleChange}
					onBlur={handleBlur}
					className="pl-2 pr-10 py-1.5 md:w-72 w-60 rounded-md bg-background-primary transition delay-[50000s]
					placeholder:text-white text-sm outline-none"
				/>
				<label htmlFor="name">
					<FaUserAlt className="absolute right-2 top-2 text-sm" />
				</label>
				{touched.name && errors.name ? <p className="text-start text-xs mt-0.5">{errors.name}</p> : null}
			</div>
			<div className="relative">
				<input
					type="email"
					name="email"
					id="email"
					value={values.email}
					placeholder="Email"
					onChange={handleChange}
					onBlur={handleBlur}
					className="pl-2 pr-10 py-1.5 md:w-72 w-60 rounded-md bg-background-primary 
					outline-none transition delay-[50000s] placeholder:text-white text-sm"
				/>
				<label htmlFor="email">
					<MdEmail className="absolute right-2 top-2" />
				</label>
				{touched.email && errors.email ? <p className="text-start text-xs mt-0.5">{errors.email}</p> : null}
			</div>
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					id="password"
					value={values.password}
					placeholder="Password"
					onChange={handleChange}
					onBlur={handleBlur}
					className="pl-2 pr-10 py-1.5 md:w-72 w-60 rounded-md bg-background-primary 
					outline-none transition delay-[50000s] placeholder:text-white text-sm"
				/>
				<label htmlFor="password" className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
					{
						showPassword ? <FaRegEyeSlash className="absolute top-2 right-2 text-sm" /> :
							<FaRegEye className="absolute top-2 right-2 text-sm" />
					}
				</label>
				{touched.password && errors.password ? <p className="text-start text-xs mt-0.5">{errors.password}</p> : null}
			</div>
			{
				showVerifyEmail &&
				<div className="bg-primary w-72 px-1 py-0.5 mb-1 rounded-md text-sm text-justify">
					An email has been sent to your email address. Please verify your email address.
				</div>
			}
			<button
				type="submit"
				className="px-3 py-1 mb-1 tracking-wide font-semibold outline-none
					text-sm text-white rounded-md bg-primary-login">
				Sign Up
			</button>
		</form>
	);
};

export default RegistrationForm;
