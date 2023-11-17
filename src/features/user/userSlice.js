import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


/*Available themes object*/
const themes = {
    winter: 'winter',
    dracula: 'dracula'
};

/*Get theme from local storage or returning default winter*/
const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('theme') || themes.winter;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
}

/*Get user from local storage or returning null*/
const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
}

//User's initial state
const initialState = {
    //get user from local storage if there is any or return default.
    user: getUserFromLocalStorage(),
    //get theme preference from local storage if there is any.
    theme: getThemeFromLocalStorage()
}

//User slice configuration
const userSlice = createSlice({
    name: 'user',
    //set initial state with initial state object.
    initialState: initialState,
    reducers: {
        //Reducer to user log in
        loginUser: (state, action) => {
            //Gather user info and token from payload in a single object user.
            const user = { ...action.payload.user, token: action.payload.jwt };
            //set user state with new user object
            state.user = user;
            //save user in to the browser's local storage.
            localStorage.setItem('user', JSON.stringify(user));
        },
        //Reducer to user log out.
        logoutUser: (state) => {
            //set user state to null.
            state.user = null;
            //remove user saved in local storage.
            localStorage.removeItem('user');
            toast.success('Logged out successfully')
        },
        //Reducer to handle theme toggle.
        toggleTheme: (state) => {
            //destructure themes dracula and winter from themes object.
            const { winter, dracula } = themes;
            //Set theme state based on current theme if it is dracula set winter and so on.
            state.theme = state.theme === dracula ? winter : dracula;
            //set data-html theme attribute with the name of the select it theme.
            document.documentElement.setAttribute('data-theme', state.theme);
            //Save theme selection into the browser's local storage.
            localStorage.setItem('theme', state.theme);
        }
    }
})

//Export user actions
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

//Export reducer.
export default userSlice.reducer;