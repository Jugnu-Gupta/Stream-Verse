import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	value: number;
}
const initialState: CounterState = {
	value: 0,
};

const CounterSlice = createSlice({
	name: "counter",
	initialState: initialState,
	reducers: {
		increaseCount: (state: CounterState) => {
			state.value += 1;
		},
		decreaseCount: (state: CounterState) => {
			state.value -= 1;
		},
		setCounter: (
			state: CounterState,
			action: PayloadAction<CounterState>
		) => {
			state.value = action.payload.value;
		},
	},
});

export const { increaseCount, decreaseCount, setCounter } =
	CounterSlice.actions;
export default CounterSlice.reducer;
