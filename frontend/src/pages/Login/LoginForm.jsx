import React from "react";
import { useFormik } from "formik";

const LoginForm = () => {
	const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
		useFormik({
			initialValues: {
				firstName: "",
				lastName: "",
				userName: "",
				email: "",
				password: "",
			},
			// validationSchema: {},
			onSubmit: (values) => {
				console.log(values);
			},
		});
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5">
			<input
				type="text"
				name="firstName"
				value={values.firstName}
				placeholder="First Name"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<input
				type="text"
				name="lastName"
				value={values.lastName}
				placeholder="Last Name"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<input
				type="text"
				name="userName"
				value={values.userName}
				placeholder="User Name"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<input
				type="email"
				name="email"
				value={values.email}
				placeholder="Email"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<input
				type="password"
				name="password"
				value={values.password}
				placeholder="Password"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		</form>
	);
};

export default LoginForm;
