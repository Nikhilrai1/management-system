import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: "#ffffff",
    themeColor: "black",
    themeHoverColor: "#FB9678"
};


export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, actions) => {
            state.theme = (actions.payload === "dark" ? "white" : "dark")
            state.themeColor = ((actions.payload === "dark") ? "black" : "white")
        },
        changeTheme: (state, actions) => {
            state.theme = actions.payload;
            state.themeColor = ((actions.payload === "#ffffff") ? "black" : "white")
        },
        changeThemeColor: (state, actions) => {
            state.themeColor = actions.payload
        },
        changeThemeHoverColor: (state, actions) => {
            state.themeHoverColor = actions.payload
        },
        saveAllTheme: (state,actions) => {
            state.theme = actions.payload.theme;
            state.themeColor = actions.payload.themeColor;
            state.themeHoverColor = actions.payload.themeHoverColor;
        }
    }
});

export const { toggleTheme, changeTheme, changeThemeColor, changeThemeHoverColor, saveAllTheme } = themeSlice.actions;
export const getTheme = (state) => state.theme;
export default themeSlice.reducer;