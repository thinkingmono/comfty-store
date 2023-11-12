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

const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            // console.log(action.payload);
            const user = {...action.payload.user, token: action.payload.jwt};
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.success('Logged out successfully')
        },
        toggleTheme: (state) => {
            const { winter, dracula } = themes;
            state.theme = state.theme === dracula ? winter : dracula;
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
        }
    }
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;