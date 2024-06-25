import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice, // import the cartSlice
        // user: userSlice, // import the userSlice
    },
});

// import {useSelector} from "react-redux";
// import {useDispatch} from "react-redux"; // use to dispatch an action.

// const cartItems = useSelector((store) => store.cart.items) // store.cart_name.state_name

// const dispatch = useDispatch();

// // to call the reducer function.
// dispatch(action_name(temp))
// //temp is passed as argument(i.e action) to the reducer.