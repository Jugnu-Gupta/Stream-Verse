import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateAvatar } from '../../utils/generateAvatar';
import { toggleNavbar } from "../../context/slices/NavbarSlice";
import makeApiRequest, { ApiRequestOptions } from "../../utils/MakeApiRequest";

const Header: React.FC = () => {
	const [userImage, setUserImage] = React.useState("");
	const [isLoggedIn, setIsLoggedIn] = React.useState(true);
	const url = window.location.pathname;
	const curUser: string = "@" + localStorage.getItem("userName");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			try {
				const request: ApiRequestOptions = {
					method: "get",
					url: "/api/v1/users/me",
				};
				const { data }: any = await makeApiRequest(request);

				console.log("Logged in");
				setIsLoggedIn(true);
				setUserImage(data.user.avatar.url || generateAvatar(data.user.fullName, "0078e1", "fff"));
			} catch (error: any) {
				console.error(error.response.data.message);
				setIsLoggedIn(false);
			}
		}
		getUser();
	}, [url]);

	const logOutHandler = async () => {
		try {
			const request: ApiRequestOptions = {
				method: "post",
				url: "/api/v1/auths/logout",
			};
			const res: any = await makeApiRequest(request);
			console.log(res);
			console.log("Logged out successfully");
			setUserImage("");

			setIsLoggedIn(false);
			localStorage.removeItem("token");
			localStorage.removeItem("userName");
			localStorage.removeItem("fullName");
			localStorage.removeItem("description");
			localStorage.removeItem("email");
			localStorage.removeItem("avatar");
			localStorage.removeItem("cover");
			navigate('/');
		} catch (error: any) {
			console.error(error.response.data.message);
			setIsLoggedIn(true);
		}
	}

	return (
		<header className="w-full flex justify-between md:gap-4 gap-3 bg-background-primary text-white py-2 sticky top-0 z-40">
			<div className="flex items-center">
				<button
					onClick={() => dispatch(toggleNavbar())}
					className="sm:hidden mr-1 outline-none">
					<RxHamburgerMenu className="text-3xl ml-2 hover:bg-background-secondary p-[6px] rounded-full duration-300" />
				</button>
				<button className="w-8 flex sm:ml-4 outline-none" onClick={() => navigate('/')}>
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
			<div className="flex items-center pr-4 text-nowrap">
				{
					isLoggedIn ? (
						<>
							<img onClick={() => navigate(`/${curUser}/personal-information`)} src={userImage} alt="userImage" className="text-sm w-7 h-7 cursor-pointer" />
							<button onClick={logOutHandler}
								className="bg-primary outline-none text-white font-semibold px-2.5 py-1 xs:px-2 text-sm xs:text-xs xs:py-1.5 rounded-md ml-2">Log Out
							</button>
						</>
					) : (
						<button onClick={() => navigate('/login')}
							className="bg-primary outline-none text-white font-semibold px-2.5 py-1 xs:px-2 text-sm xs:text-xs xs:py-1.5 rounded-md ml-2">Log In
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
