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

const initialState = {
    user: {
        username: 'thinkingmono'
    },
    theme: getThemeFromLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            console.log('Login');
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