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
            const payload = action.payload || {};
            state.isAuthenticated = true;
            state.user = payload.user || payload.data?.user || payload.profile || null;
            state.token = payload.token || payload.data?.token || payload.accessToken || null;
            state.isLogin = true;
            localStorage.setItem("user", JSON.stringify(payload));
            if (state.token) {
                localStorage.setItem("token", state.token);
            }
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