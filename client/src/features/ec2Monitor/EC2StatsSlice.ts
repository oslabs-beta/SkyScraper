import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { EC2Stats, EC2StatsState } from '../../app/types';

const initialState: EC2StatsState = {
  stats: {},
  status: 'idle',
  error: null,
};

const EC2StatsSlice = createSlice({
  name: 'EC2Stats',
  initialState,
  reducers: {
    fetchEC2StatsStart(state) {
      state.status = 'loading';
    },
    fetchEC2StatsSuccess(state, action: PayloadAction<EC2Stats>) {
      state.status = 'succeeded';
      state.stats = action.payload;
    },
    fetchEC2StatsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchEC2StatsStart, fetchEC2StatsSuccess, fetchEC2StatsFailure } =
  EC2StatsSlice.actions;

export const fetchEC2Stats = (): AppThunk => async (dispatch) => {
  dispatch(fetchEC2StatsStart());
  try {
    const response: Response = await fetch('http://localhost:3000/api/stats');
    if (!response.ok) {
      throw new Error('An unknown error occurred');
    }
    const data: EC2Stats = (await response.json()) as EC2Stats;
    dispatch(fetchEC2StatsSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchEC2StatsFailure(error.toString()));
    } else {
      dispatch(fetchEC2StatsFailure('An unknown error occurred'));
    }
  }
};

export const selectEC2Stats = (state: RootState) => state.EC2Stats.stats;
export const selectEC2Status = (state: RootState) => state.EC2Stats.status;
export const selectEC2Error = (state: RootState) => state.EC2Stats.error;

export default EC2StatsSlice.reducer;
