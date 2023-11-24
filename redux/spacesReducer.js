import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spacesList: [{ id: 1, title: 'Space 1', }, { id: 2, title: 'Space 2', }],
    spaces: {
        1: {
            color: 'lime',
            boxes: 14,
            title: 'Space 1',
        },
        2: {
            color: 'aqua',
            boxes: 23,
            title: 'Space 2',
        },
    },
    activeSpace: 1,
};

export const spacesSlice = createSlice({
    name: "spaces",
    initialState,
    reducers: {
        setActiveSpace: (state, action) => {
            state.activeSpace = action.payload;
        }
    },
});

export const {
    setActiveSpace
} = spacesSlice.actions;

export const spacesListSelector = (state) => state.spaces.spacesList;
export const spaceByIdSelector = (id) => (state) => state.spaces.spaces[id];
export const activeSpaceSelector = (state) => state.spaces.activeSpace;
export const activeSpaceDataSelector = (state) => state.spaces.spaces[state.spaces.activeSpace];

export default spacesSlice.reducer;
