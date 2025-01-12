import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/Navbar.slice";
import commentReducer from "./slices/Comment.slice";
import counterReducer from "./slices/Counter.slice";

export const store = configureStore({
	reducer: {
		navbar: navbarReducer,
		comments: commentReducer,
		counter: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
