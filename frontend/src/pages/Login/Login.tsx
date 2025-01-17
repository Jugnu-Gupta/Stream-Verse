import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full flex justify-center items-center min-h-[100vh] bg-background-primary">
			<div className="flex min-w-fit md:flex-row flex-col shadow-[0_0_5px_white] rounded-lg">
				<div className="flex flex-col justify-center bg-background-secondary md:rounded-none md:rounded-l-lg rounded-t-lg text-center p-8 md:pb-8 md:pt-8 pt-5 pb-4 md:w-2/3 w-fit xs:w-[300px]">
					<h1 className="text-primary-login text-2xl xs:text-xl font-bold pb-4">
						Login To Your Account
					</h1>
					<LoginForm />
				</div>
				<div className="md:w-1/2 w-full flex flex-col md:rounded-none md:rounded-r-lg rounded-b-lg justify-center items-center bg-primary-login px-2 py-4 md:pt-4 pt-3">
					<h1 className="text-primary-text font-bold md:text-2xl text-xl truncate-lines-1">
						Hello, Welcome!
					</h1>
					<p className="text-primary-text text-sm pb-3">Don't have an account?</p>
					<button
						onClick={() => navigate("/register")}
						className="bg-primary-text px-3 py-1 tracking-wide font-medium rounded-lg text-sm">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
