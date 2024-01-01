import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profilePicture: '',
    profileName: '',
    spaces: []
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
        setProfileSpaces: (state, action) => {
            state.spaces = action.payload;
        },
    },
});

export const {
    setProfilePicture,
    setProfileName,
    setProfileSpaces
} = profileSlice.actions;

export const profileNameSelector = (state) => state.profile.profileName;
export const profilePictureSelector = (state) => state.profile.profilePicture;
export const profileSpacesSelector = (state) => state.profile.spaces;

export default profileSlice.reducer;
