import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/NavbarSlice";
import commentReducer from "./slices/CommentSlice";
// import authReducer from "./slices/AuthSlice";

export const store = configureStore({
	reducer: {
		navbar: navbarReducer, // import the cartSlice and specify the type
		comment: commentReducer, // import the userSlice
		// auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
