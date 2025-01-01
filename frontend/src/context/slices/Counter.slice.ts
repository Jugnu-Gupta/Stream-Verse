import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterType {
	value: number;
}
const initialState: CounterType = {
	value: 0,
};

const CounterSlice = createSlice({
	name: "counter",
	initialState: initialState,
	reducers: {
		increaseCount: (state: CounterType) => {
			state.value += 1;
		},
		decreaseCount: (state: CounterType) => {
			state.value -= 1;
		},
		setCounter: (
			state: CounterType,
			action: PayloadAction<CounterType>
		) => {
			state.value = action.payload.value;
		},
	},
});

export const { increaseCount, decreaseCount, setCounter } =
	CounterSlice.actions;
export default CounterSlice.reducer;
