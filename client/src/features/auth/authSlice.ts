import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../../app/types';

/**
 * The initial state for the authentication slice.
 * 
 * @constant {AuthState} initialState - The initial state of the auth slice.
 */
const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

/**
 * Creates a slice of the Redux store for authentication.
 * 
 * @constant {Slice} authSlice - The created slice.
 */
const authSlice = createSlice({
  //The name of the slice
  name: 'auth',
  //The initial state of the slice
  initialState,
  /**
   * The reducers to handle actions and update the state.
   * 
   * @type {Object<string, Reducer>}
   */
  reducers: {
   //set token in the states
    setToken: (state, action) => {
      state.token = action.payload;
    },
   //clear token in the states
    clearToken: (state) => {
      state.token = null;
    },
  },
});

// exprot setToken and clearToken action creator from actions property in authSlice
 
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
