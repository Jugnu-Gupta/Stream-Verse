import { createSlice } from "@reduxjs/toolkit";

export interface NavbarState {
	showNavbar: boolean;
}

const initialState: NavbarState = {
	showNavbar: false,
};

const navbarSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleNavbar: (state) => {
			state.showNavbar = !state.showNavbar;
			// directly modify the state over here.
			// action.payload is the parameter and state is the initial/current state.
		},
	},
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
