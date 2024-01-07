import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spacesList: [],
    spaces: {},
    posts: {},
    spaceRequests: {},
    activeSpace: 0,
    spaces: [],
    loading: true,
};

export const spacesSlice = createSlice({
    name: "spaces",
    initialState,
    reducers: {
        setActiveSpace: (state, action) => {
            state.activeSpace = action.payload;
        },
        setSpacesList: (state, action) => {
            const list = action.payload;
            list.forEach(spaceItem => {
                state.spaces[spaceItem._id] = spaceItem;
            })
            state.spacesList = list;
            state.loading = false;
            state.activeSpace = list?.[0]?._id;
        },
        setSpacesListLoading: (state) => {
            state.loading = true;
        },
        setSpacePosts: (state, action) => {
            const {posts, spaceId} = action.payload
            state.posts[spaceId] = posts;
            state.spaceRequests[spaceId] = Date.now();
        },
    },
});

export const {
    setActiveSpace,
    setSpacesList,
    setSpacesListLoading,
    setSpacePosts
} = spacesSlice.actions;

export const spacesListSelector = (state) => state.spaces.spacesList;
export const spacesListLoadingSelector = (state) => state.spaces.loading;
export const spaceByIdSelector = (id) => (state) => state.spaces.spaces[id];
export const activeSpaceSelector = (state) => state.spaces.activeSpace;
export const activeSpaceDataSelector = (state) => state.spaces.spaces[state.spaces.activeSpace];
export const activeSpacePostSelector = (state) => state.spaces.posts[state.spaces.activeSpace];
export const spaceRequestSelector = (id) => (state) => state.spaces.spaceRequests[id];

export default spacesSlice.reducer;
