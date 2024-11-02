import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "../../context/slices/NavbarSlice";

const Header: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<header className="w-full flex justify-between gap-4 bg-background text-white py-2 sticky top-0 z-40">
			<div className="flex items-center">
				<button
					onClick={() => dispatch(toggleNavbar())}
					className="sm:hidden mr-2">
					<RxHamburgerMenu className="text-3xl ml-[17px] hover:bg-background-lighter p-[6px] rounded-full duration-300" />
				</button>
				<div className="w-8 flex sm:ml-[17px]">
					<img src={logo} alt="StreamVerse" className="aspect-square w-8 rounded-full" />
				</div>
				<h1 className="sm:0 ml-1.5 xs:hidden">StreamVerse</h1>
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
				<button>Log In</button>
				<button>Sign Up</button>
			</div>
		</header>
	);
};

export default Header;
