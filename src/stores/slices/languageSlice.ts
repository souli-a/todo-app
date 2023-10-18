import { createSlice } from '@reduxjs/toolkit';

export type LanguageState = 'french' | 'english' | '';

const initialState: LanguageState = '';

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateLanguage: (_, action) => {
      return action.payload;
    },
  },
});

export const { updateLanguage } = languageSlice.actions;
export default languageSlice.reducer;
