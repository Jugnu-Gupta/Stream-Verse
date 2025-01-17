import React from "react";
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-full justify-center items-center min-h-[100vh] bg-background-primary">
			<div className="flex min-w-fit md:flex-row flex-col-reverse shadow-[0_0_5px_white] rounded-lg">
				<div className="md:w-1/2 w-full flex flex-col md:rounded-b-lg rounded-b-lg justify-center items-center bg-primary-login px-2 py-4">
					<h1 className="text-white font-bold text-2xl xs:text-xl pb-1">
						Welcome Back
					</h1>
					<p className="text-white text-sm text-center pb-3">
						Already have an account?
					</p>
					<button onClick={() => navigate("/login")}
						className="bg-white px-3 py-1 tracking-wide rounded-lg text-sm font-semibold">
						Log In
					</button>
				</div>
				<div className="flex flex-col justify-center bg-background-secondary md:rounded-t-lg rounded-t-lg text-center p-8 md:w-2/3 w-fit xs:w-[300px]">
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
