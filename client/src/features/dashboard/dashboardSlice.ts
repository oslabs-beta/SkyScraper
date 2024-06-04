import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { EC2Instance, DashboardState } from '../../app/types';

const initialState: DashboardState = {
  instances: [],
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchEC2InstancesStart(state) {
      state.status = 'loading';
    },
    fetchEC2InstancesSuccess(state, action: PayloadAction<EC2Instance[]>) {
      state.status = 'succeeded';
      state.instances = action.payload;
    },
    fetchEC2InstancesFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchEC2InstancesStart, fetchEC2InstancesSuccess, fetchEC2InstancesFailure } =
  dashboardSlice.actions;

export const fetchEC2Instances = (): AppThunk => async (dispatch) => {
  dispatch(fetchEC2InstancesStart());
  try {
    const response: Response = await fetch('http://localhost:3000/api/ec2');
    if (!response.ok) {
      throw new Error('An unknown error occurred');
    }
    const data: EC2Instance[] = (await response.json()) as EC2Instance[];
    dispatch(fetchEC2InstancesSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchEC2InstancesFailure(error.toString()));
    } else {
      dispatch(fetchEC2InstancesFailure('An unknown error occurred'));
    }
  }
};

export const selectEC2Instances = (state: RootState) => state.rootReducer.dashboard.instances;
export const selectEC2Status = (state: RootState) => state.rootReducer.dashboard.status;
export const selectEC2Error = (state: RootState) => state.rootReducer.dashboard.error;

export default dashboardSlice.reducer;
