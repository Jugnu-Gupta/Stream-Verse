import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./context/Store.ts";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		{/* <React.StrictMode> */}
		<App />
		<Toaster />
		{/* </React.StrictMode> */}
	</Provider>
);
