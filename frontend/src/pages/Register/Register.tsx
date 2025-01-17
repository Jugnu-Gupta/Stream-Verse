import React from "react";
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-full justify-center items-center min-h-[100vh] bg-background-primary">
			<div className="flex min-w-fit md:flex-row flex-col-reverse shadow-[0_0_5px_white] rounded-lg">
				<div className="md:w-1/2 w-full flex flex-col md:rounded-none md:rounded-l-lg rounded-b-lg justify-center items-center bg-primary-login px-2 py-4 md:pt-4 pt-3">
					<h1 className="text-primary-text font-bold md:text-2xl text-xl">
						Welcome Back
					</h1>
					<p className="text-primary-text text-sm text-center pb-3">
						Already have an account?
					</p>
					<button onClick={() => navigate("/login")}
						className="bg-primary-text px-3 py-1 tracking-wide rounded-lg text-sm font-semibold">
						Log In
					</button>
				</div>
				<div className="flex flex-col justify-center bg-background-secondary md:rounded-none md:rounded-r-lg rounded-t-lg text-center p-8 md:pb-8 md:pt-8 pt-5 pb-4 md:w-2/3 w-fit xs:w-[300px]">
					<h1 className="text-primary-login text-2xl xs:text-xl font-bold pb-4">
						Create Account
					</h1>
					<RegistrationForm />
				</div>
			</div>
		</div>
	);
};

export default Register;
