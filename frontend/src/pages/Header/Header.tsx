import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateAvatar } from '../../utils/GenerateAvatar';
import { setShowNavbar } from "../../context/slices/Navbar.slice";
import makeApiRequest from "../../utils/MakeApiRequest";
import { AppDispatch, RootState } from "../../context/store";
import { useAuth } from "../../hooks/useAuth";
import Cookies from "js-cookie";
import { ErrorType } from "../../Types/Error.type";

const Header: React.FC = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loggedIn, setLoggedIn } = useAuth();
	const [userImage, setUserImage] = React.useState("");
	const [searchText, setSearchText] = React.useState(searchParams.get("searchText") || "");
	const curUser: string = "@" + localStorage.getItem("userName");
	const fullName: string = localStorage.getItem("fullName") || "User Name";
	const showNavbar: boolean = useSelector((state: RootState) => state.navbar.showNavbar);

	useEffect(() => {
		setUserImage(generateAvatar(fullName, "0078e1", "ffffffcc"));
	}, [fullName]);

	const handleSearch = () => {
		if (searchText.trim() === "") return;
		const timestamp = new Date().getTime();
		navigate(`/search?searchText=${searchText}&ts=${timestamp}`);
	}

	const logOutHandler = async () => {
		makeApiRequest({
			method: "post",
			url: "/api/v1/auths/logout",
		}).then(() => {
			console.log("Logged out successfully");
			setUserImage("");
			setLoggedIn(false);

			Cookies.remove("accessToken", { secure: true, sameSite: "lax" });
			Cookies.remove("refreshToken", { secure: true, sameSite: "lax" });

			localStorage.removeItem("userId");
			localStorage.removeItem("userName");
			localStorage.removeItem("fullName");
			localStorage.removeItem("email");
			localStorage.removeItem("avatar");
			localStorage.removeItem("cover");
			navigate('/');
		}).catch((error: ErrorType) => {
			console.error("Error logging out:", error.response.data.message);
			setLoggedIn(true);
		});
	}

	return (
		<header className="w-full flex justify-between md:gap-4 gap-3 bg-background-primary text-white py-2 sticky top-0 z-40">
			<div className="flex items-center">
				<button onClick={() => dispatch(setShowNavbar(!showNavbar))}
					className="sm:hidden mr-1 outline-none">
					<RxHamburgerMenu className="text-3xl ml-2 hover:bg-background-secondary p-[6px] rounded-full duration-300" />
				</button>
				<button className="w-8 flex sm:ml-4 outline-none" onClick={() => navigate('/')}>
					<img src={logo} alt="StreamVerse" loading='lazy' className="aspect-square w-8 rounded-full" />
				</button>
				<h1 className="sm:0 ml-1.5 xs:hidden text-primary-text">StreamVerse</h1>
			</div>
			<div className="flex items-center border-2 border-primary-border bg-background-tertiary rounded-full max-w-lg w-1/2">
				<input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}
					className="outline-none text-primary-text rounded-l-full pl-3 bg-transparent bg-opacity-50 py-1 w-full" />
				<button className="h-full pr-2 pl-1 rounded-r-full bg-transparent outline-none" onClick={handleSearch}>
					<IoSearchSharp className="text-primary-icon text-lg h-full" />
				</button>
			</div>
			<div className="flex items-center pr-4 text-nowrap">
				{loggedIn ? (<>
					<img onClick={() => navigate(`/user/${curUser}/personal-information`)} src={userImage} alt="userImage" loading='lazy' className="text-sm w-7 h-7 cursor-pointer" />
					<button onClick={logOutHandler}
						className="bg-primary outline-none text-primary-text font-semibold px-2.5 py-1 xs:px-2 text-sm xs:text-xs xs:py-1.5 rounded-md ml-2">Log Out
					</button>
				</>) : (
					<button onClick={() => navigate('/login')}
						className="bg-primary outline-none text-primary-text font-semibold px-2.5 py-1 xs:px-2 text-sm xs:text-xs xs:py-1.5 rounded-md ml-2">Log In
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
