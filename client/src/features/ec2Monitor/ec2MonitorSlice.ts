// /src/features/ec2Monitor/ec2MonitorSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { RootState } from '../../app/store';

// interface EC2Instance {
//   id: string;
//   name: string;
//   // add other necessary fields
// }

// interface EC2MonitorState {
//   instances: EC2Instance[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: EC2MonitorState = {
//   instances: [],
//   status: 'idle',
//   error: null,
// };

// const ec2MonitorSlice = createSlice({
//   name: 'ec2Monitor',
//   initialState,
//   reducers: {
//     fetchEC2InstancesStart(state) {
//       state.status = 'loading';
//     },
//     fetchEC2InstancesSuccess(state, action: PayloadAction<EC2Instance[]>) {
//       state.status = 'succeeded';
//       state.instances = action.payload;
//     },
//     fetchEC2InstancesFailure(state, action: PayloadAction<string>) {
//       state.status = 'failed';
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchEC2InstancesStart, fetchEC2InstancesSuccess, fetchEC2InstancesFailure } =
//   ec2MonitorSlice.actions;

//   export const fetchEC2Instances = () => async (dispatch) => {
//     dispatch(fetchEC2InstancesStart());
//     try {
//       const response = await axios.get('http://localhost:8080/api/ec2');
//       dispatch(fetchEC2InstancesSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchEC2InstancesFailure(error.toString()));
//     }
//   };

// export const selectEC2Instances = (state: RootState) => state.ec2Monitor.instances;

// export default ec2MonitorSlice.reducer;
// ec2MonitorSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { AppThunk, RootState } from '../../app/store';

// interface EC2Instance {
//   id: string;
//   name: string;
//   // add other necessary fields
// }

// interface EC2MonitorState {
//   instances: EC2Instance[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: EC2MonitorState = {
//   instances: [],
//   status: 'idle',
//   error: null,
// };

// const ec2MonitorSlice = createSlice({
//   name: 'ec2Monitor',
//   initialState,
//   reducers: {
//     fetchEC2InstancesStart(state) {
//       state.status = 'loading';
//     },
//     fetchEC2InstancesSuccess(state, action: PayloadAction<EC2Instance[]>) {
//       state.status = 'succeeded';
//       state.instances = action.payload;
//     },
//     fetchEC2InstancesFailure(state, action: PayloadAction<string>) {
//       state.status = 'failed';
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchEC2InstancesStart, fetchEC2InstancesSuccess, fetchEC2InstancesFailure } =
//   ec2MonitorSlice.actions;

// export const fetchEC2Instances = (): AppThunk => async (dispatch) => {
//   dispatch(fetchEC2InstancesStart());
//   try {
//     const response = await axios.get('http://localhost:3000/api/ec2');
//     dispatch(fetchEC2InstancesSuccess(response.data));
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(fetchEC2InstancesFailure(error.toString()));
//     } else {
//       dispatch(fetchEC2InstancesFailure('An unknown error occurred'));
//     }
//   }
// };

// export const selectEC2Instances = (state: RootState) => state.ec2Monitor.instances;

// export default ec2MonitorSlice.reducer;

//latest working one below
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { AppThunk, RootState } from '../../app/store';

// interface EC2Instance {
//   InstanceId: string;
//   InstanceType: string;
//   Name: string;
//   State: string;
// }

// interface EC2MonitorState {
//   instances: EC2Instance[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: EC2MonitorState = {
//   instances: [],
//   status: 'idle',
//   error: null,
// };

// const ec2MonitorSlice = createSlice({
//   name: 'ec2Monitor',
//   initialState,
//   reducers: {
//     fetchEC2InstancesStart(state) {
//       state.status = 'loading';
//     },
//     fetchEC2InstancesSuccess(state, action: PayloadAction<EC2Instance[]>) {
//       state.status = 'succeeded';
//       state.instances = action.payload;
//     },
//     fetchEC2InstancesFailure(state, action: PayloadAction<string>) {
//       state.status = 'failed';
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchEC2InstancesStart, fetchEC2InstancesSuccess, fetchEC2InstancesFailure } =
//   ec2MonitorSlice.actions;

// export const fetchEC2Instances = (): AppThunk => async (dispatch) => {
//   dispatch(fetchEC2InstancesStart());
//   try {
//     const response = await axios.get('http://localhost:3000/api/ec2');
//     dispatch(fetchEC2InstancesSuccess(response.data));
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(fetchEC2InstancesFailure(error.toString()));
//     } else {
//       dispatch(fetchEC2InstancesFailure('An unknown error occurred'));
//     }
//   }
// };

// export const selectEC2Instances = (state: RootState) => state.ec2Monitor.instances;
// export const selectEC2Status = (state: RootState) => state.ec2Monitor.status;
// export const selectEC2Error = (state: RootState) => state.ec2Monitor.error;

// export default ec2MonitorSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../app/store';

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

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// interface Instance {
//   InstanceId: string;
//   InstanceType: string;
//   Name: string;
//   State: string;
// }

// interface EC2MonitorState {
//   instances: Instance[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: EC2MonitorState = {
//   instances: [],
//   loading: false,
//   error: null,
// };

// export const fetchInstances = createAsyncThunk('ec2Monitor/fetchInstances', async () => {
//   const response = await fetch('http://localhost:3000/api/ec2');
//   if (!response.ok) {
//     throw new Error('Failed to fetch instances');
//   }
//   return (await response.json()) as Instance[];
// });

// const ec2MonitorSlice = createSlice({
//   name: 'ec2Monitor',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchInstances.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchInstances.fulfilled, (state, action) => {
//         state.instances = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchInstances.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch instances';
//       });
//   },
// });

// export default ec2MonitorSlice.reducer;
