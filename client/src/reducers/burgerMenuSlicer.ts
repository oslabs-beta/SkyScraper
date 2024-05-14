// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isOpen: true,
// };

// export const menuSlice = createSlice({
//   name: 'menu',
//   initialState,
//   reducers: {
//     toggleMenu: (state, action) => {
//       state.isOpen = !state.isOpen;
//     },
//   },
// });

// export const { toggleMenu } = menuSlice.actions;

// export default menuSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const burgerMenuReducer = menuSlice.reducer; // Export as a named export
export const { toggleMenu } = menuSlice.actions; // Export actions as needed
