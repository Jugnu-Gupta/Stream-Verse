import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/NavbarSlice";
import commentReducer from "./slices/CommentSlice";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
	reducer: {
		navbar: navbarReducer,
		comments: commentReducer,
		counter: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
