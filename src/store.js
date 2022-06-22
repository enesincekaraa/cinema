import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const storage = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem('state', JSON.stringify(getState()));
    return result;
  };
};

const getState = () => {
  if (localStorage.getItem('state') !== null) {
    return JSON.parse(localStorage.getItem('state'));
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: getState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storage)
});
