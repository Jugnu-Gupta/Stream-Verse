import React, { useEffect } from "react";
import NAVITEMS from "../../Constants/Navbar";
import logo from "../../assets/logo.png";
import { twMerge } from "tailwind-merge";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setShowNavbar } from "../../context/slices/Navbar.slice";
import { AppDispatch, RootState } from "../../context/store";
import { useNavigate, useParams } from "react-router-dom";
import { comparePaths } from "../../utils/ComparePaths";
import { addAdminName } from "../../utils/AddAdminName";


const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const page = window.location.pathname;
	const dispatch = useDispatch<AppDispatch>();
	const { adminName } = useParams<{ adminName: string }>();
	const showNavbar: boolean = useSelector(
		(state: RootState) => state.navbar.showNavbar
	);

	useEffect(() => {
		const navbarOverlay = document.querySelector(".navbar-overlay");
		navbarOverlay?.classList.remove("hidden");
		if (showNavbar) {
			navbarOverlay?.classList.remove("animate-left");
			navbarOverlay?.classList.add("animate-right2");

			document.body.style.overflow = "hidden";
		} else {
			navbarOverlay?.classList.remove("animate-right2");
			navbarOverlay?.classList.add("animate-left");

			document.body.style.overflow = "";
		}

		// Cleanup function to reset the overflow property when the component unmounts
		return () => {
			document.body.style.overflow = "";
		};
	}, [showNavbar]);

	return (
		<nav className="h-[100vh] w-full fixed z-50 top-0 navbar-overlay xs:block hidden">
			<div className="flex h-full w-full">
				<div className="w-48 min-w-48 h-full bg-background-primary text-nowrap animate-right2">
					<div className="w-full flex items-center text-white py-[10px]">
						<button onClick={() => dispatch(setShowNavbar(!showNavbar))}>
							<RxHamburgerMenu className="text-3xl ml-[17px] hover:bg-background-secondary p-[6px] rounded-full duration-300" />
						</button>
						<div className="w-8 flex mr-2 ml-1.5">
							<img src={logo} alt="StreamVerse" loading='lazy' className="aspect-square w-8 rounded-full" />
						</div>
						<h1>StreamVerse</h1>
					</div>

					<div className="p-2 pt-4 h-[calc(100vh-51px)] flex flex-col justify-between">
						<div className="text-primary-text text-sm font-semibold flex flex-col gap-1.5 w-full justify-start animate-right">
							{NAVITEMS.filter((item) => item.isTop).map(
								(item) => (
									<button
										key={item.id}
										className="w-full animate-right outline-none"
										onClick={() => navigate(addAdminName(item.path))}>
										<p className={twMerge("h-9 px-2 flex items-center gap-6 rounded-lg border-2 border-primary-border hover:bg-primary",
											(comparePaths(item.path, page, adminName ? adminName : null) && "bg-primary"))}>
											<item.iconOutline
												className={twMerge(
													item.iconOutlineClass,
													"w-8"
												)}
											/>
											{/* <item.iconFilled
												className={twMerge(
													item.iconFilledMargin,
													item.iconFilledClass
												)}
											/> */}
											<span
												className={twMerge(
													item.titleClass
												)}>
												{item.title}
											</span>
										</p>
									</button>
								)
							)}
						</div>
						<div className="text-primary-text text-sm font-semibold flex flex-col gap-1.5 w-full justify-start animate-right">
							{NAVITEMS.filter((item) => !item.isTop).map(
								(item) => (
									<button
										key={item.id}
										className="w-full animate-right outline-none"
										onClick={() => navigate(addAdminName(item.path))}>
										<p className={twMerge("h-9 px-2 flex items-center gap-6 rounded-lg border-2 border-primary-border hover:bg-primary",
											(comparePaths(item.path, page, addAdminName(item.path)) && "bg-primary"))}>
											<item.iconOutline
												className={twMerge(
													item.iconOutlineClass,
													"w-8"
												)}
											/>
											{/* <item.iconFilled
												className={twMerge(
													item.iconFilledMargin,
													item.iconFilledClass
												)}
											/> */}
											<span>{item.title}</span>
										</p>
									</button>
								)
							)}
						</div>
					</div>
				</div>
				<div
					className={twMerge("h-full bg-black text-white bg-opacity-20", showNavbar && "w-screen")}
					onClick={() => dispatch(setShowNavbar(!showNavbar))}>
				</div>
			</div>
		</nav >
	);
};

export default Navbar;
