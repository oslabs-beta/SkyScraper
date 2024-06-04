import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../app/types';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

createAction<string>('auth/setToken');
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
