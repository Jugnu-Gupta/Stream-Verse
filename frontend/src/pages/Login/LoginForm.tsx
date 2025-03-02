import React from "react";
import { useFormik } from "formik";
import { MdEmail } from "react-icons/md";
import makeApiRequest from "../../utils/MakeApiRequest";
import { LoginValidationSchema } from "./LoginValidationSchema";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { ErrorType } from "../../type/Error.type";
import { ResponseType } from "../../type/Response.type";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = React.useState(false);
	const [showVerifyEmail, setShowVerifyEmail] = React.useState(false);

	const { values, touched, errors, handleChange, handleSubmit, handleBlur } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginValidationSchema,
		onSubmit: async (values) => {
			makeApiRequest({
				method: "post",
				url: "/api/v1/auths/login",
				data: { email: values.email.trim(), password: values.password },
			}).then((response) => {
				const data = (response as ResponseType).data;
				toast.success("Logged in successfully");
				setShowVerifyEmail(false);

				// data in cookies for future use
				Cookies.set("accessToken", data.accessToken, { secure: true, sameSite: "lax" });
				Cookies.set("refreshToken", data.refreshToken, { secure: true, sameSite: "lax" });

				// data in localStorage for future use
				localStorage.setItem("userId", data.user._id);
				localStorage.setItem("userName", data.user.userName);
				localStorage.setItem("fullName", data.user.fullName);
				localStorage.setItem("email", data.user.email);
				localStorage.setItem("avatar", JSON.stringify(data.user.avatar));
				localStorage.setItem("cover", JSON.stringify(data.user.coverImage));

				navigate("/");
			}).catch((error: ErrorType) => {
				if (error.response.data.statusCode === 403) {
					setShowVerifyEmail(true);
					console.error(error.response.data.message);
				} else {
					setShowVerifyEmail(false);
					toast.error(error.response.data.message);
				}
			});
		},
	});

	const emailSchema = Yup.string()
		.email("Invalid email Id")
		.required("Email is required to send reset password link.");
	const forgotPasswordMail = async (email: string) => {
		try {
			await emailSchema.validate(email);

			makeApiRequest({
				method: "post",
				url: "/api/v1/auths/forgot-password-mail",
				data: { email }
			}).then(() => {
				toast.success("A reset password link has been sent to your given email ID. Please reset the password from there.");
			}).catch((error: ErrorType) => {
				toast.error(error.response.data.message);
			});
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				toast.error(error.message);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 items-center text-primary-text">
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
                	outline-none transition delay-[50000s] placeholder:text-primary-text text-sm"
				/>
				<label htmlFor="email">
					<MdEmail className="absolute top-2 right-2" />
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
				outline-none transition delay-[50000s] placeholder:text-primary-text text-sm"
				/>
				<label htmlFor="password" className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? <FaRegEyeSlash className="absolute top-2 right-2 text-sm " /> :
						<FaRegEye className="absolute top-2 right-2 text-sm" />
					}
				</label>
				{touched.password && errors.password ? <p className="text-start text-xs mt-0.5">{errors.password}</p> : null}
			</div>
			{showVerifyEmail &&
				<div className="bg-primary-login bg-opacity-85 md:w-72 w-60 px-1 py-0.5 rounded-md text-sm text-justify text-primary-text">
					An email has been sent to your email address. Please verify your email address.
				</div>
			}

			<div className="w-full flex justify-between">
				<div></div>
				<button type="button"
					className="text-end font-semibold text-primary-text text-xs cursor-pointer"
					onClick={() => forgotPasswordMail(values.email)}>Forgot Password
				</button>
			</div>
			<button
				type="submit"
				className="px-3 py-1 mb-1 tracking-wide font-semibold 
				text-sm text-primary-text rounded-md bg-primary-login">
				Log In
			</button>
		</form>
	);
};

export default LoginForm;
