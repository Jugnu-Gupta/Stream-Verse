import { Provider } from "react-redux";
import { store } from "./context/store";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/Register/Register.js";
import Register from "./pages/Login/Login.js";
import EmailVerification from "./pages/EmailVerification/EmailVerification.jsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.jsx";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		// redirect ot login or home page
		errorElement: <div>404 Not Found</div>,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "email-verification",
				element: <EmailVerification />,
			},
			{
				path: "password-reset",
				element: <PasswordReset />,
			},
		],
	},
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={routes} />
		</Provider>
	);
}

export default App;
