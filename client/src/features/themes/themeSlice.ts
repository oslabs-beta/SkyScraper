import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;

export default themeSlice.reducer;
