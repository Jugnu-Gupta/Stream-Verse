import { createSlice } from "@reduxjs/toolkit";

export interface NavbarState {
	showNavbar: boolean;
}

const initialState: NavbarState = {
	showNavbar: false,
};

const navbarSlice = createSlice({
	name: "navbar",
	initialState,
	reducers: {
		setShowNavbar: (state, action) => {
			state.showNavbar = action.payload;
			// directly modify the state over here.
			// action.payload is the parameter and state is the initial/current state.
		},
	},
});

export const { setShowNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
