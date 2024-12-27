import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
		setShowNavbar: (state: NavbarState, action: PayloadAction<boolean>) => {
			state.showNavbar = action.payload;
		},
	},
});

export const { setShowNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
