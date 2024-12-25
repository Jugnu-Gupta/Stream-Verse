import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
	name: "counter",
	initialState: {
		value: 0,
	},
	reducers: {
		increaseCount: (state) => {
			state.value += 1;
		},
		decreaseCount: (state) => {
			state.value -= 1;
		},
		setCounter: (state, action) => {
			state.value = action.payload.value;
		},
	},
});

export const { increaseCount, decreaseCount, setCounter } =
	CounterSlice.actions;
export default CounterSlice.reducer;
