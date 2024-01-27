import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: {},
  chats: {},
  onlineMembers: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, spaceId } = action.payload;
      if (!state.chats[spaceId]) state.chats[spaceId] = [];
      state.chats[spaceId].push(message);
    },
    initChats: (state, action) => {
      const { messages, spaceId } = action.payload;
      state.chats[spaceId] = messages;
    },
    initMembers: (state, action) => {
      const { members, spaceId } = action.payload;
      state.members[spaceId] = members;
    },
    initOnlineMembers: (state, action) => {
      const { onlineMembers } = action.payload;
      state.onlineMembers = onlineMembers;
    },
    changeOnlineMember: (state, action) => {
      const { profileId, isOnline } = action.payload;
      state.onlineMembers[profileId] = isOnline;
    },
  },
});

export const {
  addMessage,
  initChats,
  initMembers,
  initOnlineMembers,
  changeOnlineMember,
} = chatSlice.actions;

export const chatSelector = (spaceId) => (state) => state.chat.chats[spaceId];

export const membersSelector = (spaceId) => (state) => state.chat.members[spaceId];

export const onlineMembersSelector = (state) => state.chat.onlineMembers;

export default chatSlice.reducer;
