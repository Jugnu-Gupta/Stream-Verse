import React from "react";
import { useFormik } from "formik";

const RegistrationForm: React.FC = () => {
	const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
		useFormik({
			initialValues: {
				email: "",
				password: "",
			},
			// validationSchema: {},
			onSubmit: (values) => {
				console.log(values);
			},
		});
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 items-center text-white">
			<input
				type="email"
				name="email"
				value={values.email}
				placeholder="Email"
				onChange={handleChange}
				onBlur={handleBlur}
				className="px-2 py-1 w-72 rounded-md bg-background-lightest 
                outline-none transition delay-[50000s] placeholder:text-white 
                placeholder:text-sm focus:ring-2 focus:ring-primary"
			/>
			<input
				type="password"
				name="password"
				value={values.password}
				placeholder="Password"
				onChange={handleChange}
				onBlur={handleBlur}
				className="px-2 py-1 w-72 rounded-md bg-background-lightest 
                outline-none transition delay-[50000s] placeholder:text-white 
                placeholder:text-sm focus:ring-2 focus:ring-primary"
			/>
			<button
				type="submit"
				className="px-4 py-2 mb-1 tracking-wide font-medium 
				text-xs text-white rounded-md bg-primary">
				Sign Up
			</button>
		</form>
	);
};

export default RegistrationForm;
