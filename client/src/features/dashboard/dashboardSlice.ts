/**
 * Dashboard slice containing state, reducers, and actions related to EC2 instances.
 *
 * @module dashboardSlice
 */
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { EC2Instance, DashboardState } from '../../app/types';

//Initial state for Dashboard slice
const initialState: DashboardState = {
  instances: [],
  status: 'idle',
  error: null,
};

//Slice containing reducers and actions related to EC2 instances.
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    /**
     * Action to update state when fetching EC2 instances starts.
     *
     * @param {DashboardState} state - Current state of the dashboard slice.
     */
    fetchEC2InstancesStart(state) {
      state.status = 'loading';
    },
    //Action to update state when fetching EC2 instances succeeds.
    fetchEC2InstancesSuccess(state, action: PayloadAction<EC2Instance[]>) {
      state.status = 'succeeded';
      state.instances = action.payload;
    },
    //Action to update state when fetching EC2 instances fails
    fetchEC2InstancesFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Exporting action creators
export const { fetchEC2InstancesStart, fetchEC2InstancesSuccess, fetchEC2InstancesFailure } =
  dashboardSlice.actions;


/**
 * Thunk function to fetch EC2 instances asynchronously.
 * 
 * @returns {AppThunk} Thunk function to dispatch actions.
 */
export const fetchEC2Instances = (): AppThunk => async (dispatch) => {
  dispatch(fetchEC2InstancesStart()); // Dispatching action to update status to 'loading'
  try {
    const response: Response = await fetch('http://localhost:3000/api/ec2');//Fetching data from API
    if (!response.ok) {
      throw new Error('An unknown error occurred');//Handel non-OK response
    }

    
    /**
 * Parse the JSON response data into an array of EC2Instance objects.
 * 
 * @type {EC2Instance[]} 
 * @param {Response} response - The response object containing JSON data.
 * @returns {EC2Instance[]} An array of EC2Instance objects parsed from the JSON data.
 */
    const data: EC2Instance[] = (await response.json()) as EC2Instance[];
    dispatch(fetchEC2InstancesSuccess(data));//Dispathing action to update state with fetched data
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchEC2InstancesFailure(error.toString()));// Dispatching action with error message
    } else {
      dispatch(fetchEC2InstancesFailure('An unknown error occurred'));// Dispatching action for unknown errors
    }
  }
};

/**
 * Selector function to select EC2 instances from the state.
 * 
 * @param {RootState} state - Root state of the Redux store.
 * @returns {EC2Instance[]} Array of EC2 instances.
 */
export const selectEC2Instances = (state: RootState) => state.dashboard.instances;
//Selector function to select status from the state.
export const selectEC2Status = (state: RootState) => state.dashboard.status;
//Selector function to select error message from the state.
export const selectEC2Error = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;
