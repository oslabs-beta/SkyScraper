// /src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ec2MonitorReducer from './ec2MonitorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ec2Monitor: ec2MonitorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
