import { createSlice } from '@reduxjs/toolkit';
import { DropdownState } from '../../app/types';

const initialState: DropdownState = {
  showDropdown: false,
};

const dropDownSlice = createSlice({
  name: 'dropDown',
  initialState,
  reducers: {
    toggleDropdown(state) {
      state.showDropdown = !state.showDropdown;
    },
    closeDropdown(state) {
      state.showDropdown = false;
    },
  },
});

export const { toggleDropdown, closeDropdown } = dropDownSlice.actions;

export default dropDownSlice.reducer;
