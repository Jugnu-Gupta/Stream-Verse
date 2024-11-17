import React from "react";
import { useFormik } from "formik";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import makeApiRequest from "../../utils/MakeApiRequest";
import type { ApiRequestOptions } from "../../utils/MakeApiRequest";
import { RegistrationValidationSchema } from "./RegistrationValidationSchema";

// interface FormValues {
// 	firstName: string;
// 	lastName: string;
// 	userName: string;
// 	email: string;
// 	password: string;
// }

const RegistrationForm: React.FC = () => {
	const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
		useFormik({
			initialValues: {
				name: "",
				// lastName: "",
				// userName: "",
				email: "",
				password: "",
			},
			validationSchema: RegistrationValidationSchema,
			onSubmit: async (values) => {
				const request: ApiRequestOptions = {
					method: "post",
					url: "/api/v1/auths/register",
					data: {
						fullName: name,
						// fullName: `${values.firstName}${values.lastName !== "" ? " " + values.lastName : ""
						// 	}`,
						// userName: values.userName,
						email: values.email,
						password: values.password,
					},
				};
				// const res = await makeApiRequest(request);
				console.log(values);
				// console.log(res);
			},
		});
	// console.log(errors);
	return (
		<form
			onSubmit={handleSubmit}
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
					className="pl-2 pr-10 py-1 w-72 rounded-md bg-background-primary outline-none transition delay-[50000s]
				placeholder:text-white placeholder:text-sm focus:ring-2 focus:ring-primary"
				/>
				<label htmlFor="name">
					<FaUserAlt className="absolute right-2 top-2 text-sm" />
				</label>
			</div>
			{/* <input
					type="text"
					name="lastName"
					value={values.lastName}
					placeholder="Last Name"
					onChange={handleChange}
					onBlur={handleBlur}
					className="px-2 py-1 w-72 rounded-md bg-background-primary outline-none transition duration-[50000s]
				placeholder:text-white placeholder:text-sm focus:ring-2 focus:ring-primary"
				/> */}
			{/* <input
					type="text"
					name="userName"
					value={values.userName}
					placeholder="User Name"
					onChange={handleChange}
					onBlur={handleBlur}
					className="px-2 py-1 w-72 rounded-md bg-background-primary 
					outline-none transition delay-[50000s] placeholder:text-white 
					placeholder:text-sm focus:ring-2 focus:ring-primary"
				/> */}
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
					<MdEmail className="absolute right-2 top-2" />
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
					<FaLock className="absolute right-2 top-2 text-sm" />
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

export default RegistrationForm;
