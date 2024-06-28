import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="flex justify-center items-center min-h-[100vh] bg-background">
			<div className="flex min-w-[750px] h-[400px] shadow-[0_0_5px_white] rounded-lg">
				<div className="w-1/3 flex flex-col rounded-l-lg justify-center items-center bg-primary px-2">
					<h1 className="text-white font-bold text-3xl pb-2">
						Welcome Back
					</h1>
					<button
						onClick={() => navigate("/register")}
						className="bg-white px-4 py-2 tracking-wide font-medium rounded-lg text-xs">
						Sign In
					</button>
				</div>
				<div className="flex flex-col justify-center bg-background-light rounded-r-lg text-center p-4 w-2/3">
					<h1 className="text-primary text-3xl font-bold pb-4">
						Create Account
					</h1>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
//

export default Login;
