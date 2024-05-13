import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the state type
interface LoginState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  user: any | null; // Replace 'any' with a more specific type if possible
  token: string | null;
  error: string | null;
}

// Define the initial state
const initialState: LoginState = {
  status: 'idle',
  user: null,
  token: null,
  error: null,
};

// Define the type for the payload of the async thunk
interface LoginPayload {
  user: any; // Replace 'any' with a more specific type if possible
  token: string;
}

// Create the async thunk
export const LogIn = createAsyncThunk<LoginPayload, any, { rejectValue: { message: string } }>(
  '/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue({ message: `${err.response?.data.message}` });
      } else {
        return thunkAPI.rejectWithValue({ message: 'An unexpected error occurred in loginSlicer' });
      }
    }
  },
);

// Create the slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LogIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogIn.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(LogIn.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message
            ? action.error.message
            : 'LogIn has been rejected with unknown error';
        }
      });
  },
});

export default loginSlice.reducer;
