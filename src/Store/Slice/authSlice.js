import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
    isLogin: false,
    // isLoading: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLogin = true;
            // state.isLoading = false,
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLogin = false;

            localStorage.removeItem("user");
        }
    }

})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;