import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'
import userReducer from "./features/user/userSlice";

//store configuration. Add cart and user reducers from cartSlice and userSlice. Key = 'name to access' value = 'import name'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
})