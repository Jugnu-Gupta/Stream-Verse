import React from "react";
import NAVITEMS from "../../Constants/Navbar";
import { twMerge } from "tailwind-merge";
import { useNavigate, useParams } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import { addAdminName } from "../../utils/AddAdminName";
import { comparePaths } from "../../utils/ComparePaths";

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const windowWidth = useWindowWidth();
	const isVideoDetailPage = window.location.pathname.includes("/video/");
	const page = window.location.pathname;
	const { adminName } = useParams<{ adminName: string }>();

	return (
		<nav className="h-[calc(100vh-51px)] sticky z-10 top-[51px] left-0">
			{windowWidth < 500 ? (
				<div className="w-0 h-full"></div>
			) : windowWidth <= 1023 || isVideoDetailPage ? (
				<div className="w-full h-full relative group">
					<div className="relative w-16 h-full"></div>
					<div className="absolute left-0 top-0 z-10 w-16 hover:max-w-48 hover:w-48 h-full p-2 pt-4 flex flex-col justify-between bg-background-primary text-nowrap">
						<div className="text-primary-text text-sm font-semibold flex flex-col gap-1.5 w-full justify-start">
							{NAVITEMS.filter((item) => item.isTop).map(
								(item) => (
									<button
										key={item.id}
										className="w-full outline-none"
										onClick={() => navigate(addAdminName(item.path))}>
										<p className={twMerge("px-2 h-9 flex items-center gap-6 border-2 border-primary-border rounded-lg hover:bg-primary",
											(comparePaths(item.path, page, adminName) && "bg-primary"))}>
											<item.iconOutline
												className={twMerge(
													item.iconOutlineClass,
													"w-8 group-hover:w-[29px]"
												)}
											/>
											<span
												className={twMerge(
													item.titleClass,
													"group-hover:block hidden"
												)}>
												{item.title}
											</span>
										</p>
									</button>
								)
							)}
						</div>
						<div className="text-primary-text text-sm font-semibold flex flex-col gap-1.5 w-full justify-start">
							{NAVITEMS.filter((item) => !item.isTop).map(
								(item) => (
									<button
										key={item.id}
										className="w-full outline-none"
										onClick={() => navigate(addAdminName(item.path))}>
										<p className={twMerge("h-9 px-2 flex items-center border-2 border-primary-border gap-6 rounded-lg hover:bg-primary",
											(comparePaths(item.path, page, adminName) && "bg-primary"))}>
											<item.iconOutline
												className={twMerge(
													item.iconOutlineClass,
													"w-8 group-hover:w-[29px]"
												)}
											/>
											<span className="group-hover:block hidden">
												{item.title}
											</span>
										</p>
									</button>
								)
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="h-full p-2 pt-4 max-w-48 w-48 flex flex-col justify-between bg-background-primary text-nowrap">
					<div className="text-primary-text text-sm font-semibold flex flex-col gap-1.5 w-full justify-start">
						{NAVITEMS.filter((item) => item.isTop).map((item) => (
							<button
								key={item.id}
								className="w-full outline-none"
								onClick={() => navigate(addAdminName(item.path))}>
								<p className={twMerge("px-2 h-9 flex items-center gap-6 rounded-lg border-2 border-primary-border hover:bg-primary",
									(comparePaths(item.path, page, adminName) && "bg-primary"))}>
									<item.iconOutline
										className={twMerge(
											item.iconOutlineClass,
											"w-[29px]"
										)}
									/>
									<span className={twMerge(item.titleClass)}>
										{item.title}
									</span>
								</p>
							</button>
						))}
					</div>
					<div className="text-primary-text text-sm font-semibold flex flex-col gap-1.5 w-full justify-start">
						{NAVITEMS.filter((item) => !item.isTop).map((item) => (
							<button
								key={item.id}
								className="w-full outline-none"
								onClick={() => navigate(addAdminName(item.path))}>
								<p className={twMerge("h-9 px-2 flex items-center border-2 border-primary-border gap-6 rounded-lg hover:bg-primary",
									(comparePaths(item.path, page, adminName) && "bg-primary"))}>
									<item.iconOutline
										className={twMerge(
											item.iconOutlineClass,
											"w-[29px]"
										)}
									/>
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
