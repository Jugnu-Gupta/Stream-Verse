import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full flex justify-center items-center min-h-[100vh] bg-background-primary">
			<div className="flex min-w-fit md:flex-row flex-col shadow-[0_0_5px_white] rounded-lg">
				<div className="flex flex-col justify-center bg-background-secondary md:rounded-t-lg rounded-t-lg text-center p-8 md:w-2/3 w-fit xs:w-[300px]">
					<h1 className="text-primary-login text-2xl xs:text-xl font-bold pb-4">
						Login To Your Account
					</h1>
					<LoginForm />
				</div>
				<div className="md:w-1/2 w-full flex flex-col md:rounded-r-lg rounded-b-lg justify-center items-center bg-primary-login px-2 py-4">
					<h1 className="text-white font-bold text-2xl xs:text-xl pb-2 truncate-lines-1">
						Hello, Welcome!
					</h1>
					<p className="text-white text-sm pb-3">Don't have an account?</p>
					<button
						onClick={() => navigate("/register")}
						className="bg-white px-3 py-1 tracking-wide font-medium rounded-lg text-sm">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
