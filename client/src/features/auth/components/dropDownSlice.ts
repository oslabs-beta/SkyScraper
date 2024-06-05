import { createSlice } from '@reduxjs/toolkit';

interface DropdownState {
  showDropdown: boolean;
}

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
