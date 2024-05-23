import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(authApi.endpoints.login.matchPending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.token = payload.message; // Assuming the token is in the message field
  //     })
  //     .addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
  //       state.loading = false;
  //       state.error = error.message;
  //     });
  // },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
