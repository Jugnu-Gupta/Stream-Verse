import React, { useEffect } from "react";
import NAVITEMS from "../../Constants/Navbar";
import { twMerge } from "tailwind-merge";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../../context/slices/NavbarSlice";
import { RootState } from "../../context/store";
import useWindowWidth from "../../hooks/useWindowWidth";

const Navbar: React.FC = () => {
	const windowWidth = useWindowWidth();
	const dispatch = useDispatch();
	const isVisible: boolean = useSelector(
		(state: RootState) => state.navbar.showNavbar
	);

	useEffect(() => {
		const navbarOverlay = document.querySelector(".navbar-overlay");
		navbarOverlay?.classList.remove("hidden");
		if (isVisible && windowWidth < 1200) {
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
	}, [isVisible, windowWidth]);

	return (
		windowWidth < 1200 && (
			<nav className="h-[100vh] w-full fixed z-50 top-0 hidden navbar-overlay">
				<div className="flex h-full w-full">
					<div className="w-48 min-w-48 h-full bg-background text-nowrap animate-right2">
						<div className="w-full flex items-center text-white gap-2 py-[11px]">
							<button onClick={() => dispatch(toggleNavbar())}>
								<RxHamburgerMenu className="text-3xl ml-[17px] hover:bg-background-lighter p-[6px] rounded-full duration-300" />
							</button>
							<h1>YouTube</h1>
						</div>

						<div className="p-2 pt-2 h-[calc(100vh-51px)] flex flex-col justify-between">
							<div className="text-white text-sm font-semibold flex flex-col w-full justify-start animate-right">
								{NAVITEMS.filter((item) => item.isTop).map(
									(item) => (
										<button
											key={item.id}
											className="w-full animate-right">
											<p className="py-2 px-2 flex items-center gap-6 rounded-xl hover:bg-background-light">
												<item.iconOutline
													className={twMerge(
														item.iconOutlineMargin,
														item.iconOutlineClass
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
							<div className="text-white text-sm font-semibold flex flex-col w-full justify-start animate-right">
								{NAVITEMS.filter((item) => !item.isTop).map(
									(item) => (
										<button
											key={item.id}
											className="w-full animate-right">
											<p className="py-2 px-2 flex items-center gap-6 rounded-xl hover:bg-background-light">
												<item.iconOutline
													className={twMerge(
														item.iconOutlineMargin,
														item.iconOutlineClass
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
						className={twMerge(
							"h-full bg-black text-white bg-opacity-20",
							isVisible && "w-[100%]"
						)}
						onClick={() => dispatch(toggleNavbar())}></div>
				</div>
			</nav>
		)
	);
};

export default Navbar;
