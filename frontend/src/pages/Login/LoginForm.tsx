import React from "react";
import { useFormik } from "formik";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { ApiRequestOptions } from "../../utils/MakeApiRequest";
import makeApiRequest from "../../utils/MakeApiRequest";
import { LoginValidationSchema } from "./LoginValidationSchema";

const LoginForm: React.FC = () => {
	const { values, handleChange, handleSubmit, handleBlur } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginValidationSchema,
		onSubmit: async (values) => {
			const request: ApiRequestOptions = {
				method: "post",
				url: "/api/v1/auths/login",
				data: values,
			};
			// const res = await makeApiRequest(request);

			// console.log(res);
		},
	});

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 items-center text-white">
			<div className="relative">
				<input
					type="email"
					name="email"
					id="email"
					value={values.email}
					placeholder="Email"
					onChange={handleChange}
					onBlur={handleBlur}
					className="pl-2 pr-10 py-1 w-72 rounded-md bg-background-primary 
                outline-none transition delay-[50000s] placeholder:text-white 
                placeholder:text-sm focus:ring-2 focus:ring-primary"
				/>
				<label htmlFor="email">
					<MdEmail className="absolute top-2 right-2" />
				</label>
			</div>
			<div className="relative">
				<input
					type="password"
					name="password"
					id="password"
					value={values.password}
					placeholder="Password"
					onChange={handleChange}
					onBlur={handleBlur}
					className="pl-2 pr-10 py-1 w-72 rounded-md bg-background-primary 
                	outline-none transition delay-[50000s] placeholder:text-white 
                	placeholder:text-sm focus:ring-2 focus:ring-primary"
				/>
				<label htmlFor="password">
					<FaLock className="absolute top-2 right-2 text-sm" />
				</label>
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

export default LoginForm;
