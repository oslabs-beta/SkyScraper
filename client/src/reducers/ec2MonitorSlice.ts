import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../store';

interface EC2Instance {
  InstanceId: string;
  InstanceType: string;
  Name: string;
  State: string;
}

interface EC2MonitorState {
  instances: EC2Instance[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EC2MonitorState = {
  instances: [],
  status: 'idle',
  error: null,
};

const ec2MonitorSlice = createSlice({
  name: 'ec2Monitor',
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
  ec2MonitorSlice.actions;

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

export const selectEC2Instances = (state: RootState) => state.ec2Monitor.instances;
export const selectEC2Status = (state: RootState) => state.ec2Monitor.status;
export const selectEC2Error = (state: RootState) => state.ec2Monitor.error;

export default ec2MonitorSlice.reducer;
