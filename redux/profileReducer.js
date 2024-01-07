import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profilePicture: '',
    profileName: '',
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;;
        },
        setProfileName: (state, action) => {
            state.profileName = action.payload;
        },
    },
});

export const {
    setProfilePicture,
    setProfileName,
} = profileSlice.actions;

export const profileNameSelector = (state) => state.profile.profileName;
export const profilePictureSelector = (state) => state.profile.profilePicture;

export default profileSlice.reducer;
