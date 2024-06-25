import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div>
				<h1></h1>
				<button onClick={() => navigate("/register")}>Sign In</button>
			</div>
			<div>
				<h1>Create Account</h1>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
