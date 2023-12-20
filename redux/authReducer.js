import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setDataToken: (state, action) => {
            state.dataToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setProfileId: (state, action) => {
            state.profileId = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        resetAuthData: (state) => {
            state = {};
        },
    },
});

export const {
    resetAuthData,
    setAccessToken,
    setDataToken,
    setEmail,
    setProfileId,
    setRefreshToken,
    setType,
    setUserId
} = authSlice.actions;

export const accessTokenSelector = (state) => state.auth.accessToken;
export const dataTokenSelector = (state) => state.auth.dataToken;
export const refreshTokenSelector = (state) => state.auth.refreshToken;
export const userIdSelector = (state) => state.auth.userId;
export const profileIdSelector = (state) => state.auth.profileId;
export const typeSelector = (state) => state.auth.type;
export const emailSelector = (state) => state.auth.email;

export default authSlice.reducer;
