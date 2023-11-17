import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Cart's initial state
const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0
}

//Function to get cart from browser's local storage if there is any or return default cart state.
const getCartFromLocalStorage = () => {
    const initialCart = JSON.parse(localStorage.getItem('cart'));
    return initialCart || defaultState;
}

//Cart slice configuration
const cartSlice = createSlice({
    name: 'cart',
    //Get cart initial state from local storage or set it to default.
    initialState: getCartFromLocalStorage(),
    reducers: {
        //Reducer to add a product to the cart.
        addItem: (state, action) => {
            //Destructure product from payload passed in dispatch call.
            const { product } = action.payload;
            //Find product in the cart if it was already added.
            const cartItem = state.cartItems.find((item) => item.cartId === product.cartId);
            //If the product was found in the cart just increase amount pass in product payload to the amount of the product already in the cart. If not, add new product to the cart.
            if (cartItem) {
                cartItem.amount += product.amount;
            } else {
                state.cartItems.push(product);
            }
            //Set new quantity of items in the cart, adding new product amount.
            state.numItemsInCart += product.amount;
            //Set new cart total, adding the new product total to existing cart total.
            state.cartTotal = state.cartTotal + (product.amount * product.price);
            //Recalculate totals with new state.
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Item added to cart');
        },
        //Reducer to clear the cart.
        clearCart: (state) => {
            //Set cart stored in local storage to initial value.
            localStorage.setItem('cart', JSON.stringify(defaultState));
            return defaultState;
        },
        //Reducer to remove a product from the cart.
        removeItem: (state, action) => {
            //Destructure cart id from the payload sent from dispatch call.
            const { cartId } = action.payload;
            //Find product in the cart.
            const cartItem = state.cartItems.find((item) => item.cartId === cartId);
            //Filter product in the cart and return an array without it.
            state.cartItems = state.cartItems.filter((item) => item.cartId !== cartId);
            //Set new quantity of items in the cart, adding new product amount.
            state.numItemsInCart = state.numItemsInCart - cartItem.amount;
            //Set new cart total, adding the new product total to existing cart total.
            state.cartTotal = state.cartTotal - (cartItem.amount * cartItem.price);
            //Recalculate totals with new state.
            cartSlice.caseReducers.calculateTotals(state);
            toast.error('Item removed from cart');
        },
        //Reducer to edit the product amount in the cart.
        editItem: (state, action) => {
            //Destructure cart id and amount from the payload send from the dispatch call.
            const { cartId, amount } = action.payload;
            //Find product in the cart.
            const editItem = state.cartItems.find((item) => item.cartId === cartId);
            //Set new quantity of items in the cart, adding new product amount.
            state.numItemsInCart = state.numItemsInCart + (amount - editItem.amount);
            //Set new cart total, adding the new product total to existing cart total.
            state.cartTotal = state.cartTotal + ((amount - editItem.amount) * editItem.price);
            //Set the product's new amount.
            editItem.amount = amount;
            //Recalculate totals with new state.
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Cart updated');
        },
        //Reducer to calculate the order total considering cart total + tax + shipping
        calculateTotals: (state) => {
            //Set order tax 10% from cart total
            state.tax = state.cartTotal * 0.1;
            //Set order total = cart total + shipping + tax.
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            //Parse JSON state object to string and store it in browser's local storage.
            const currentState = JSON.stringify(state);
            localStorage.setItem('cart', currentState);
        }
    }
});

//export actions to make them available in the rest of the files
export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

//export reducer. 
export default cartSlice.reducer;