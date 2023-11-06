import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0
}

const getCartFromLocalStorage = () => {
    const initialCart = JSON.parse(localStorage.getItem('cart'));
    console.log(initialCart);
    return initialCart || defaultState;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage(),
    reducers: {
        addItem: (state, action) => {
            const { product } = action.payload;
            console.log(product);
            const cartItem = state.cartItems.find((item) => item.cartId === product.cartId);
            if (cartItem) {
                cartItem.amount += product.amount;
            } else {
                state.cartItems.push(product);
            }
            console.log(state.cartItems);
            console.log(state.cartItems.length);
            state.numItemsInCart += product.amount;
            state.cartTotal = state.cartTotal + (product.amount * product.price);
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Item added to cart');
        },
        clearCart: () => { },
        removeItem: () => { },
        editItem: () => { },
        calculateTotals: (state) => {
            state.tax = state.cartTotal * 0.1;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            const currentState = JSON.stringify(state);
            console.log(currentState);
            localStorage.setItem('cart', currentState);
        }
    }
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;