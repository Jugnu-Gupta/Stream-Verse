import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateAvatar } from '../../utils/GenerateAvatar';
import { setShowNavbar } from "../../context/slices/NavbarSlice";
import makeApiRequest from "../../utils/MakeApiRequest";
import { AppDispatch, RootState } from "../../context/store";
import { useAuth } from "../../hooks/useAuth";


const Header: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loggedIn, setLoggedIn } = useAuth();
	const [userImage, setUserImage] = React.useState("");
	const curUser: string = "@" + localStorage.getItem("userName");
	const showNavbar: boolean = useSelector((state: RootState) => state.navbar.showNavbar);

	useEffect(() => {
		setUserImage(generateAvatar(curUser.substring(1), "0078e1", "ffffffcc"));
	}, [curUser]);

	const logOutHandler = async () => {
		makeApiRequest({
			method: "post",
			url: "/api/v1/auths/logout",
		}).then((res: any) => { // eslint-disable-line
			console.log(res);
			console.log("Logged out successfully");
			setUserImage("");

			setLoggedIn(false);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("userId");
			localStorage.removeItem("userName");
			localStorage.removeItem("fullName");
			localStorage.removeItem("email");
			localStorage.removeItem("avatar");
			localStorage.removeItem("cover");
			navigate('/');
		}).catch((error: any) => { // eslint-disable-line
			console.error(error.response.data.message);
			setLoggedIn(true);
		});
	}

	return (
		<header className="w-full flex justify-between md:gap-4 gap-3 bg-background-primary text-white py-2 sticky top-0 z-40">
			<div className="flex items-center">
				<button
					onClick={() => dispatch(setShowNavbar(!showNavbar))}
					className="sm:hidden mr-1 outline-none">
					<RxHamburgerMenu className="text-3xl ml-2 hover:bg-background-secondary p-[6px] rounded-full duration-300" />
				</button>
				<button className="w-8 flex sm:ml-4 outline-none" onClick={() => navigate('/')}>
					<img src={logo} alt="StreamVerse" className="aspect-square w-8 rounded-full" />
				</button>
				<h1 className="sm:0 ml-1.5 xs:hidden text-primary-text">StreamVerse</h1>
			</div>
			<div className="flex items-center border-2 border-primary-border rounded-full bg-transparent max-w-lg w-1/2">
				<input
					type="text"
					placeholder="Search"
					className="outline-none rounded-l-full pl-3 bg-background-secondary bg-opacity-50 py-1 w-full"
				/>
				<div className="h-full pr-2 pl-1 rounded-r-full bg-background-secondary cursor-pointer">
					<IoSearchSharp className="text-primary-icon text-lg h-full" />
				</div>
			</div>
			<div className="flex items-center pr-4 text-nowrap">
				{loggedIn ? (
					<>
						<img onClick={() => navigate(`/${curUser}/personal-information`)} src={userImage} alt="userImage" className="text-sm w-7 h-7 cursor-pointer" />
						<button onClick={logOutHandler}
							className="bg-primary outline-none text-primary-text font-semibold px-2.5 py-1 xs:px-2 text-sm xs:text-xs xs:py-1.5 rounded-md ml-2">Log Out
						</button>
					</>
				) : (
					<button onClick={() => navigate('/login')}
						className="bg-primary outline-none text-primary-text font-semibold px-2.5 py-1 xs:px-2 text-sm xs:text-xs xs:py-1.5 rounded-md ml-2">Log In
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
