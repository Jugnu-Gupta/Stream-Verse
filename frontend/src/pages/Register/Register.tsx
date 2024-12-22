import React from "react";
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="flex w-full justify-center items-center min-h-[100vh] bg-background-primary">
			<div className="flex min-w-[750px] h-[400px] shadow-[0_0_5px_white] rounded-lg">
				<div className="w-1/3 flex flex-col rounded-l-lg justify-center items-center bg-primary-login px-2">
					<h1 className="text-white font-bold text-3xl pb-1">
						Welcome Back
					</h1>
					<p className="text-white text-sm text-center pb-3">
						Already have an account?
					</p>
					<button
						onClick={() => navigate("/login")}
						className="bg-white px-3 py-1 tracking-wide rounded-lg text-sm font-semibold">
						Sign In
					</button>
				</div>
				<div className="flex flex-col justify-center bg-background-secondary rounded-r-lg text-center p-4 w-2/3">
					<h1 className="text-primary-login text-3xl font-bold pb-4">
						Create Account
					</h1>
					<RegistrationForm />
				</div>
			</div>
		</div>
	);
};

export default Register;
