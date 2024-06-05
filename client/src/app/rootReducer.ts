import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import EC2StatsReducer from '../features/ec2Monitor/EC2StatsSlice';
import themeReducer from '../features/themes/themeSlice';
import dropDownReducer from '../features/auth/components/dropDownSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  EC2Stats: EC2StatsReducer,
  theme: themeReducer,
  dropDown: dropDownReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
