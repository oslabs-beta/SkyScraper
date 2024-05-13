import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
