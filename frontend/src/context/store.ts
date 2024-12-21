import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/NavbarSlice";
import commentReducer from "./slices/CommentSlice";

export const store = configureStore({
	reducer: {
		navbar: navbarReducer,
		comments: commentReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
