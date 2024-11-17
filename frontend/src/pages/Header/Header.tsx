import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/slices/NavbarSlice";
import makeApiRequest, { ApiRequestOptions } from "../../utils/MakeApiRequest";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userName, setUserName] = React.useState("");
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const logInHandler = async () => {
		const request: ApiRequestOptions = {
			method: "get",
			url: "/api/v1/auths/me",
		};
		const res = await makeApiRequest(request) as { status: number };

		if (res.status === 200) {
			console.log("Logged out successfully");
			setUserName(localStorage.getItem("userName") || "");
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
			// toast.error("Error logging out");
			console.error("Error logging out");
		}
		// setIsLoggedIn(true);
	}

	useEffect(() => {
		logInHandler();
	}, []);

	return (
		<header className="w-full flex justify-between gap-4 bg-background-primary text-white py-2 sticky top-0 z-40">
			<div className="flex items-center">
				<button
					onClick={() => dispatch(toggleNavbar())}
					className="sm:hidden mr-2 outline-none">
					<RxHamburgerMenu className="text-3xl ml-[17px] hover:bg-background-secondary p-[6px] rounded-full duration-300" />
				</button>
				<button className="w-8 flex sm:ml-[17px] outline-none" onClick={() => navigate('/')}>
					<img src={logo} alt="StreamVerse" className="aspect-square w-8 rounded-full" />
				</button>
				<h1 className="sm:0 ml-1.5 xs:hidden">StreamVerse</h1>
			</div>
			<div className="flex items-center border-2 border-white rounded-full bg-transparent max-w-lg w-1/2">
				<input
					type="text"
					placeholder="Search"
					className="outline-none rounded-l-full pl-3 bg-background-secondary bg-opacity-50 py-1 w-full"
				/>
				<div className="h-full pr-2 pl-1 rounded-r-full bg-background-secondary cursor-pointer">
					<IoSearchSharp className="text-white text-lg h-full" />
				</div>
			</div>
			<div className="flex items-center mr-4 text-nowrap">
				{
					isLoggedIn ? (
						<button
							className="bg-primary outline-none text-white font-semibold px-4 py-1 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300 ml-2">{userName}
						</button>
					) : (
						<button
							className="bg-primary outline-none text-white font-semibold px-4 py-1 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300 ml-2">Log In
						</button>
					)
				}
				{/* <button
					className="bg-primary text-white font-semibold px-4 py-1 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300 ml-2">Log In
				</button> */}
			</div>
		</header>
	);
};

export default Header;
