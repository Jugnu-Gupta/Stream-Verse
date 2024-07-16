import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/slices/NavbarSlice";

const Header: React.FC = () => {
	const isVisible: boolean = useSelector(
		(state: RootState) => state.navbar.showNavbar
	);
	const dispatch = useDispatch();
	console.log(isVisible);

	return (
		<header className="w-full flex justify-between gap-4 bg-background text-white py-2 sticky top-0 z-50">
			<div className="flex items-center gap-2">
				<button onClick={() => dispatch(toggleNavbar())}>
					<RxHamburgerMenu className="text-3xl ml-[17px] hover:bg-background-lighter p-[6px] rounded-full duration-300" />
				</button>
				<h1>YouTube</h1>
			</div>
			<div className="flex items-center border-2 border-white rounded-full bg-transparent max-w-lg w-1/2">
				<input
					type="text"
					placeholder="Search"
					className="outline-none rounded-l-full pl-3 bg-background-light bg-opacity-50 py-1 w-full"
				/>
				<div className="h-full pr-2 pl-1 rounded-r-full bg-background-lighter cursor-pointer">
					<IoIosSearch className="text-white text-lg h-full" />
				</div>
			</div>
			<div className="flex items-center mr-4 text-nowrap gap-4">
				<button>Login In</button>
				<button>Sign Up</button>
			</div>
		</header>
	);
};

export default Header;
