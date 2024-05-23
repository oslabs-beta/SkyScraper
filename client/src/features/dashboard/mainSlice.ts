import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../app/store';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { EC2Instance, dashboardState } from '../../app/types';

<<<<<<<< HEAD:client/src/features/dashboard/mainSlice.ts
interface mainState {
  instances: EC2Instance[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: mainState = {
========
const initialState: dashboardState = {
>>>>>>>> Tripp/BE-Loginv2.0:client/src/features/dashboard/dashboardSlice.ts
  instances: [],
  status: 'idle',
  error: null,
};

<<<<<<<< HEAD:client/src/features/dashboard/mainSlice.ts
const mainSlice = createSlice({
  name: 'main',
========
const dashboardSlice = createSlice({
  name: 'dashboard',
>>>>>>>> Tripp/BE-Loginv2.0:client/src/features/dashboard/dashboardSlice.ts
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
<<<<<<<< HEAD:client/src/features/dashboard/mainSlice.ts
  mainSlice.actions;
========
  dashboardSlice.actions;
>>>>>>>> Tripp/BE-Loginv2.0:client/src/features/dashboard/dashboardSlice.ts

export const fetchEC2Instances = (): AppThunk => async (dispatch) => {
  dispatch(fetchEC2InstancesStart());
  try {
    const response = await axios.get('http://localhost:3000/api/ec2');
    dispatch(fetchEC2InstancesSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchEC2InstancesFailure(error.toString()));
    } else {
      dispatch(fetchEC2InstancesFailure('An unknown error occurred'));
    }
  }
};

<<<<<<<< HEAD:client/src/features/dashboard/mainSlice.ts
export const selectEC2Instances = (state: RootState) => state.main.instances;
export const selectEC2Status = (state: RootState) => state.main.status;
export const selectEC2Error = (state: RootState) => state.main.error;

export default mainSlice.reducer;
========
export const selectEC2Instances = (state: RootState) => state.dashboard.instances;
export const selectEC2Status = (state: RootState) => state.dashboard.status;
export const selectEC2Error = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;
>>>>>>>> Tripp/BE-Loginv2.0:client/src/features/dashboard/dashboardSlice.ts
