import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const currentTheme = action.payload;
      state.theme = currentTheme;
    },
    toggleTheme: (state, action) => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setTheme, toggleTheme } = settingSlice.actions;

export const themeSelector = (state) => state.setting.theme;

export default settingSlice.reducer;
