import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import todoReducer from './slices/todoSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    todos: todoReducer,
    theme: themeReducer,
  },
});

export default store;
