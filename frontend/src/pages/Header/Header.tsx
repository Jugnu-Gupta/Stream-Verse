import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateAvatar } from '../../utils/GenerateAvatar';
import { setShowNavbar } from "../../context/slices/Navbar.slice";
import makeApiRequest from "../../utils/MakeApiRequest";
import { AppDispatch, RootState } from "../../context/store";
import { useAuth } from "../../hooks/useAuth";
import Cookies from "js-cookie";
import { SearchType, updateFilters } from "../../context/slices/Search.slice";


const Header: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loggedIn, setLoggedIn } = useAuth();
	const [userImage, setUserImage] = React.useState("");
	const [searchText, setSearchText] = React.useState("");
	const curUser: string = "@" + localStorage.getItem("userName");
	const showNavbar: boolean = useSelector((state: RootState) => state.navbar.showNavbar);
	const searchValues: SearchType = useSelector((state: RootState) => state.search);

	useEffect(() => {
		setUserImage(generateAvatar(curUser.substring(1), "0078e1", "ffffffcc"));
	}, [curUser]);

	const handleSearch = () => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/videos`,
			params: {
				query: searchText,
				type: searchValues.type,
				duration: searchValues.duration,
				sortBy: searchValues.sortBy,
				uploadDate: searchValues.uploadDate,
			}
		}).then((response: any) => { // eslint-disable-line
			console.log(response.data.data);
			if (searchValues.type === "video") {
				dispatch(updateFilters({ ...searchValues, videos: response.data.data, playlists: [], channels: [], curSearch: "video" }));
			} else if (searchValues.type === "playlist") {
				dispatch(updateFilters({ ...searchValues, playlists: response.data.data, videos: [], channels: [], curSearch: "playlist" }));
			} else if (searchValues.type === "channel") {
				dispatch(updateFilters({ ...searchValues, channels: response.data.data, videos: [], playlists: [], curSearch: "channel" }));
			}
			navigate('/search');
		}).catch((error: any) => { // eslint-disable-line
			console.error(error.response.data.message);
		});
	}

	const logOutHandler = async () => {
		makeApiRequest({
			method: "post",
			url: "/api/v1/auths/logout",
		}).then((res: any) => { // eslint-disable-line
			console.log(res);
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
		}).catch((error: any) => { // eslint-disable-line
			console.error(error.response.data.message);
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
					<img src={logo} alt="StreamVerse" className="aspect-square w-8 rounded-full" />
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
					<img onClick={() => navigate(`/${curUser}/personal-information`)} src={userImage} alt="userImage" className="text-sm w-7 h-7 cursor-pointer" />
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
