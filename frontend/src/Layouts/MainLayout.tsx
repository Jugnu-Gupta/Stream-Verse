import React from "react";
import Header from "../pages/Header/Header.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import NavbarOverlay from "../components/Navbar/NavbarOverlay.tsx";

interface MainLayoutProps {
	children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className="bg-background relative">
			<Header />
			<NavbarOverlay />
			{/* <div className="flex min-h-[100vh] w-full relative top-0"> */}
			<div className="flex w-full relative top-0">
				<Navbar />
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
