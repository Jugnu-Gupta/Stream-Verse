import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import NAVITEMS from "../../Constants/Navbar";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC = () => {
	const isVisible: boolean = useSelector(
		(state: RootState) => state.navbar.showNavbar
	);

	return (
		<nav className="h-[calc(100vh-51px)] sticky top-[51px]">
			{!isVisible ? (
				<div className="w-16 h-full p-1 pt-2 flex flex-col justify-between duration-300 bg-background">
					<div className="text-white text-[8px] flex flex-col items-center w-full">
						{NAVITEMS.filter((item) => item.isTop).map((item) => (
							<button key={item.id} className="w-full">
								<p className="py-2 flex flex-col items-center rounded-xl hover:bg-background-light">
									<item.iconOutline
										className={twMerge(
											"mb-1",
											item.iconOutlineClass
										)}
									/>
									{/* <item.iconFilled
										className={twMerge(
											"mb-1",
											item.iconFilledClass
										)}
									/> */}
									<span>{item.title}</span>
								</p>
							</button>
						))}
					</div>
					<div className="text-white text-[8px] flex flex-col items-center w-full">
						{NAVITEMS.filter((item) => !item.isTop).map((item) => (
							<button key={item.id} className="w-full">
								<p className="py-2 flex flex-col items-center rounded-xl hover:bg-background-light">
									<item.iconOutline
										className={twMerge(
											"mb-1",
											item.iconOutlineClass
										)}
									/>
									{/* <item.iconFilled
										className={twMerge(
											"mb-1",
											item.iconFilledClass
										)}
									/> */}
									<span>{item.title}</span>
								</p>
							</button>
						))}
					</div>
				</div>
			) : (
				<div className="max-w-48 w-48 h-full p-2 pt-2 flex flex-col justify-between bg-background duration-500 text-nowrap animate-right">
					<div className="text-white text-sm font-semibold flex flex-col w-full justify-start">
						{NAVITEMS.filter((item) => item.isTop).map((item) => (
							<button key={item.id} className="w-full">
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
									<span className={twMerge(item.titleClass)}>
										{item.title}
									</span>
								</p>
							</button>
						))}
					</div>
					<div className="text-white text-sm font-semibold flex flex-col w-full justify-start">
						{NAVITEMS.filter((item) => !item.isTop).map((item) => (
							<button key={item.id} className="w-full">
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
						))}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
