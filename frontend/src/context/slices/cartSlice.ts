import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: ["hello"]
    },
    reducers: {
        addItem: (state, action) => {
            // directly modify the state over here.

            // action.payload is the parameter and state is the initial/current state.
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            // directly modify state over here.
            state.items.pop();
        },
    }
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;