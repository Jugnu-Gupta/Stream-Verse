import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import EmailVerification from "./pages/EmailVerification/EmailVerification.tsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.tsx";
import HomeLayout from "./Layouts/HomeLayout.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Outlet />}>
					<Route index element={<HomeLayout />}></Route>
					{/* <Route path="/about" element={<About/>}></Route> */}
				</Route>
				<Route
					path="email-verification"
					element={<EmailVerification />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/password-reset" element={<PasswordReset />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
