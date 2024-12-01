import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	loggedIn: boolean;
}

const initialState: AuthState = {
	loggedIn: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoggedIn: (state, action) => {
			state.loggedIn = action.payload;
			// directly modify the state over here.
			// action.payload is the parameter and state is the initial/current state.
		},
	},
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
