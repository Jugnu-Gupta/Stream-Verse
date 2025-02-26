import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import emailVerification from "../../assets/email-verification.gif";
import { ResponseType } from "../../type/Response.type";
import loadingGif from "../../assets/loading.gif";
import unaothorized from "../../assets/unauthorized.gif";

const EmailVerification: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token: string | null = searchParams.get("token");
	const [loading, setLoading] = React.useState(false);
	const [isVerified, setIsVerified] = React.useState(false);

	useEffect(() => {
		if (token) {
			setLoading(true);
			makeApiRequest({
				method: "get",
				url: `/api/v1/auths/email-verification`,
				params: { token }
			}).then((response) => {
				if ((response as ResponseType).statusCode === 200) {
					console.log("Email verified successfully");
					setIsVerified(true);
				} else {
					console.log("Resend email verification link or try again or Invalid token");
				}
			});
			setLoading(false);
		}
	}, [token, navigate]);

	return (
		<div className="flex justify-center items-center min-h-[100vh] bg-background">
			<div className="flex flex-col justify-center items-center">
				<img src={loading ? loadingGif : (isVerified ? emailVerification : unaothorized)} alt="verification-tick" className="w-2/3 aspect-square" />
				{loading ?
					(<h1 className="text-xl text-white font-bold tracking-wide mt-2">Verifying...</h1>) :
					isVerified ?
						(<h1 className="text-xl text-white font-bold tracking-wide mt-2 sm:text-lg">Email Verified successfully</h1>) :
						(<>
							<h1 className="text-lg xs:text-base text-white font-semibold tracking-wide">Invalid or expired verification link.</h1>
							<h1 className="text-lg xs:text-base text-white font-semibold tracking-wide">Please request a new verification email.</h1>
						</>)
				}
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
