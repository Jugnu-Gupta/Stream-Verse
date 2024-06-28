import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

const Register: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center min-h-[100vh] bg-background">
			<div className="flex min-w-[750px] h-[400px] shadow-[0_0_5px_white] rounded-lg">
				<div className="flex flex-col justify-center bg-background-light rounded-l-lg text-center p-4 w-2/3">
					<h1 className="text-primary text-3xl font-bold pb-4">
						Login To Your Account
					</h1>
					<RegistrationForm />
				</div>
				<div className="w-1/3 flex flex-col rounded-r-lg justify-center items-center bg-primary px-2">
					<h1 className="text-white font-bold text-3xl pb-2">
						New Here?
					</h1>
					<button
						onClick={() => navigate("/login")}
						className="bg-white px-4 py-2 tracking-wide font-medium rounded-lg text-xs">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
