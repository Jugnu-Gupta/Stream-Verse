import React from "react";
import Header from "../pages/Header/Header.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import NavbarOverlay from "../components/Navbar/NavbarOverlay.tsx";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<div className="bg-background-primary relative">
			<Header />
			<NavbarOverlay />
			{/* <div className="flex min-h-[100vh] w-full relative top-0"> */}
			<div className="flex w-full relative top-0">
				<Navbar />
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
