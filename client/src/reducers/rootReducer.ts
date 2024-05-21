// /src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mainReducer from './mainSlice';
import EC2StatsReducer from './EC2StatsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  EC2Stats: EC2StatsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
