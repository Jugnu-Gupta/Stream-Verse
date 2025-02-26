import React from "react";
import PasswordResetForm from "./PasswordResetForm";

const PasswordReset: React.FC = () => {

	return (
		<div className="w-full flex justify-center items-center min-h-[100vh] bg-background-primary">
			<div className="flex min-w-fit md:flex-row flex-col shadow-[0_0_5px_white] rounded-lg">
				<div className="flex flex-col justify-center bg-background-secondary md:rounded-none md:rounded-l-lg rounded-t-lg text-center p-8 md:py-8 pt-5 pb-4 xs:px-4 w-fit xs:w-[300px]">
					<h1 className="text-primary-login text-2xl xs:text-xl font-bold pb-4">
						Reset Password
					</h1>
					<PasswordResetForm />
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
