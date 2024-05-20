// /src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import ec2MonitorReducer from '../features/ec2Monitor/ec2MonitorSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  ec2Monitor: ec2MonitorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
