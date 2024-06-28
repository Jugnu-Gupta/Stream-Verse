import React from "react";
import { MdVerifiedUser } from "react-icons/md";

const EmailVerification: React.FC = () => {
	return (
		<div
			className="flex justify-center items-center min-h-[100vh] bg-background
        ">
			<div className="flex flex-col justify-center items-center">
				<MdVerifiedUser className="text-primary bg-white rounded-full text-9xl" />
				<h1 className="text-xl text-white">Email Verification</h1>
			</div>
		</div>
	);
};

export default EmailVerification;
