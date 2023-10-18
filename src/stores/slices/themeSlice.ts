import { createSlice } from '@reduxjs/toolkit';

type ThemeState = 'light' | 'dark' | '';

const initialState: ThemeState = '';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (_, action) => {
      return action.payload;
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
export { type ThemeState };
