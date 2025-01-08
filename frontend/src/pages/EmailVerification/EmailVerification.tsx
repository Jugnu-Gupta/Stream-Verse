import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import emailVerification from "../../assets/email-verification.gif";

const EmailVerification: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token: string | null = searchParams.get("token");

	useEffect(() => {
		if (token) {
			makeApiRequest({
				method: "get",
				url: `/api/v1/auths/email-verification`,
				params: { token }
			}).then((res: any) => { // eslint-disable-line
				if (res.status === 200) {
					console.log("Email verified successfully");
				} else {
					console.log("Resend email verification link or try again or Invalid token");
				}
				console.log(res);
			});
		}
	}, [token, navigate]);

	return (
		<div className="flex justify-center items-center min-h-[100vh] bg-background">
			<div className="flex flex-col justify-center items-center">
				<img src={emailVerification} alt="verification-tick" loading='lazy' className="w-2/3 aspect-square" />
				<h1 className="text-xl text-white font-bold tracking-wide mt-2">Email Verified successfully</h1>
				<button
					onClick={() => navigate('/login')}
					className="bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md ml-2">
					Login
				</button>
			</div>
		</div>
	);
};

export default EmailVerification;
