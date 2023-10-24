import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "LIGHT",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const currentTheme = action.payload;
      state.theme = currentTheme;
    },
    toggleTheme: (state, _action) => {
        state.theme = state.theme === 'LIGHT' ? 'DARK' : 'LIGHT';
    },
  },
});

export const { setTheme, toggleTheme } = settingSlice.actions;

export const themeSelector = (state) => state.setting.theme;

export default settingSlice.reducer;
