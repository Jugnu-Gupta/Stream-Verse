import React from "react";
import Header from "../pages/Header/Header.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import NavbarOverlay from "../components/Navbar/NavbarOverlay.tsx";
import Home from "../pages/Home/Home.tsx";

const HomeLayout: React.FC = () => {
	return (
		<div className="bg-background relative">
			<Header />
			<NavbarOverlay />
			<div className="flex min-h-[100vh] w-full relative top-0">
				<Navbar />
				<Home />
			</div>
		</div>
	);
};

export default HomeLayout;
