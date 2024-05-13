import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginSlicer';
import burgerMenuReducer from './reducers/burgerMenuSlicer';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    burgerMenu: burgerMenuReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
