import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/themes/themeSlice';
import dropDownReducer from '../features/auth/dropDownSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  dropDown: dropDownReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
